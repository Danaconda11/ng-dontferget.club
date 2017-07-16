const express = require('express')
const config = require('./config')
const init = require('./init')
const todos = require('./route_handlers/todos')
const auth = require('./middleware/auth')
const user = require('./route_handlers/user')
const files = require('./files')
const body_parser = require('body-parser')
const passport = require('./passport')
const util = require('./route_handlers/util')
const session = require('express-session')

let app = express()
app.use(files.static())
app.use(session({resave: false, saveUninitialized: false,
  secret: config.session_secret}))
app.use(passport.initialize())
app.use(passport.session())
if (config.auto_login) {
  app.use(util.auto_login)
}
app.use(body_parser.urlencoded({extended: false}))
app.get('/', auth.require_auth({otherwise: '/login'}),
  util.redirect('/lists'))
app.get('/login', auth.require_no_auth({otherwise: '/'}), user.login_page)
app.post('/login', user.login)
app.get('/logout', user.logout)
app.use(auth.require_auth({otherwise: '/login'}))
app.get('/auth/wunderlist', passport.authenticate('wunderlist'))
app.get('/auth/wunderlist/callback',
  passport.authenticate('wunderlist'),
  util.redirect('/account'))
app.get('/account', user.view_account)
app.get('/api/todos', todos.get_all)
app.listen(config.http_port,
  () => console.log(`Listening on 0.0.0.0:${config.http_port}`))
if (config.debug) {
  init().catch(e => {
    console.error(e)
  })
}
