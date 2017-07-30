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
  }).catch(err => {
    console.error(err)
    next(err)
  })
}

E.logout = (req, res) => {
  req.logout()
  res.redirect('/login')
}

E.logged_in = (req, res) => {
  res.json(req.user)
}
