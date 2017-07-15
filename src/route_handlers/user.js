const mongo = require('../mongo')
const files = require('../files')
const config = require('../config')
let E = module.exports

// START HACK josh: fill out real user auth
let current_user
E.logged_in = (req, res, next) => {
  // HACK josh: automate login during development. Remove once login sessions
  // are persistent across server restarts
  if (config.auto_login) {
    mongo.connect().then(db => {
      return db.collection('users').findOne({username: 'josh'}).then(user => {
        req.user = current_user = user
        next()
      })
    }).catch(next)
  } else {
    req.user = current_user
    next()
  }
}
E.login = (req, res, next) => {
  mongo.connect().then(db => {
    current_user = req.body
    return db.collection('users')
    .update(current_user, current_user, {upsert: true})
    .then(() => {
      res.redirect('/')
    })
  }).catch(next)
}
E.logout = (req, res) => {
  current_user = null
  res.redirect('/login')
}
// END HACK

// HACK josh: use react and ajax to render this page once react-router is used
// note: in proper node code you should never create html like this
E.view_account = (req, res, next) => {
  mongo.connect().then(db => {
    return db.collection('users')
      .findOne({username: current_user.username}).then(user => {
        let html = `
          <h1>Account</h1>
          <p>Username: ${user.username}</p>`
        if (user.wunderlist_id) {
          html += `<p>Wunderlist ID: ${user.wunderlist_id}`
        } else {
          html += `
            <p>
              Wunderlist ID:
              <a href="/auth/wunderlist">link wunderlist</a>
            </p>`
        }
        res.send(html)
      })
  }).catch(next)
}

E.login_page = (req, res, next) => {
  files.send(res, 'login.html').catch(e => next(e))
}
