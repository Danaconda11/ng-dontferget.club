const mongo = require('../mongo')
const users = require('../users')
const Wunderlist = require('wunderlist')
const config = require('../config')
const _ = require('lodash')
let E = module.exports

// wunderlist api "promises" don't behave like real promises should
let real_promise = maybe_promise => {
  return new Promise((resolve, reject) => {
    maybe_promise.done(data => {
      resolve(data)
    }).fail(err => {
      reject(err)
    })
  })
}

let promise_map = (array, fn) => {
  let results = []
  return array.reduce((prev, item, i) => {
    return prev.then(res => {
      if (i) {-
        results.push(res)
      }
      return fn(item)
    })
  }, Promise.resolve())
  .then(() => {
    return results
  })
}

let sync_wunderlist = user => mongo.connect().then(db => {
  let api = new Wunderlist({
    accessToken: _.get(user, 'external.wunderlist.access_token'),
    clientID: config.wunderlist.client_id,
  })
  return real_promise(api.http.lists.all()).then(lists => {
    return promise_map(lists, list => {
      return sync_list(api, user, list)
    })
  }).then(lists => {
    let sync = {lists: lists.length, items: 0}
    lists.forEach(l => {
      sync.items += l.items.length
    })
    return sync
  })
})

let sync_list = (api, user, list) => {
  let list_doc = {
    user: user._id,
    wunderlist_id: list.id,
    title: list.title,
  }
  console.log('syncing', list.title)
  return real_promise(api.http.tasks.forList(list.id)).then(tasks => {
    list_doc.items = tasks.map(t => {
      return {
        wunderlist_id: t.id,
        completed: t.completed,
        starred: t.starred,
        title: t.title,
      }
    })
    return mongo.connect().then(db => {
      return db.collection('lists').update(
        {wunderlist_id: list_doc.wunderlist_id},
        {
          $set: _.pick(list_doc, ['user', 'wunderlist_id', 'title']),
          $addToSet: {items: list_doc.items},
        },
        {upsert: true})
    }).then(() => {
      return list_doc
    })
  })
}

E.import = (req, res, next) => mongo.connect().then(db => {
  return users.find_one({username: req.user.username}).then(user => {
    let token = _.get(user, 'external.wunderlist.access_token')
    if (!token) {
      return res.status(401).json({
        error: 'Not authenticated with wunderlist',
      })
    }
    return sync_wunderlist(user).then(sync => {
      res.status(201).json({sync})
    }).catch(err => {
      console.error(err)
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      })
    })
  })
})
