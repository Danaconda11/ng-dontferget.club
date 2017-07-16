const mongo = require('../mongo')
const files = require('../files')
const config = require('../config')
const util = require('util')
const users  = require('../users')
const _ = require('lodash')
let E = module.exports

E.login = (req, res, next) => {
  // HACK josh: automatically creating the user on login attempt is bad security
  mongo.connect().then(db => {
    let user = req.body
    return db.collection('users').update(user, {$set: user}, {upsert: true})
    .then(() => {
      return users.find_one({username: user.username})
    }).then(user => {
      return util.promisify(req.login.bind(req))(user)
    }).then(() => {
      res.redirect('/')
    })
  }).catch(e => {
    console.error(e)
    next(e)
  })
}

E.logout = (req, res) => {
  req.logout()
  res.redirect('/login')
}

// HACK josh: use react and ajax to render this page once react-router is used
// note: in proper node code you should never create html like this
E.view_account = (req, res, next) => {
  mongo.connect().then(db => {
    return db.collection('users')
      .findOne({username: req.user.username}).then(user => {
        let html = `
          <h1>Account</h1>
          <p>Username: ${user.username}</p>`
        let wunderlist_id = _(user).get('external.wunderlist.id')
        if (wunderlist_id) {
          html += `<p>Wunderlist ID: ${wunderlist_id}`
        } else {
          html += `
            <p>
              Wunderlist ID:
              <a href="/auth/wunderlist">link Wunderlist</a>
            </p>`
        }
        res.send(html)
      })
  }).catch(next)
}

E.login_page = (req, res, next) => {
  files.send(res, 'login.html').catch(e => next(e))
}
