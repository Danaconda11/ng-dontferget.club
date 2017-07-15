const files = require('../files')
let E = module.exports

// HACK josh: fill out real user auth
let current_user
E.logged_in = (req, res, next) => {
  req.user = current_user
  next()
}
E.login = (req, res) => {
  current_user = req.body
  res.redirect('/')
}
E.logout = (req, res) => {
  current_user = null
  res.redirect('/login')
}
// END HACK

E.login_page = (req, res, next) => {
  files.send(res, 'login.html').catch(e => next(e))
}
