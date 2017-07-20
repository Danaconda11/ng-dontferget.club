const express = require('express')
const config = require('./config')
const init = require('./init')
const lists = require('./route_handlers/lists')
const auth = require('./middleware/auth')
const user = require('./route_handlers/user')
const files = require('./files')
const body_parser = require('body-parser')
const passport = require('./passport')
const util = require('./route_handlers/util')
const session = require('express-session')
const add = require('./route_handlers/add')
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
app.get('/login', auth.require_no_auth({otherwise: '/'}),
  files.send_file('login.html'))
app.post('/login', user.login)
app.get('/logout', user.logout)
app.use(auth.require_auth({otherwise: '/login'}))
app.get('/auth/wunderlist', passport.authenticate('wunderlist'))
app.get('/auth/wunderlist/callback',
  passport.authenticate('wunderlist'),
  util.redirect('/account'))
app.get('/lists', files.send_file('index.html'))
app.get('/account', user.view_account)
app.get('/api/lists', lists.get_all)
app.post('/api/lists/import', lists.import)
app.listen(config.http_port,
  () => console.log(`Listening on 0.0.0.0:${config.http_port}`))
if (config.debug) {
  init().catch(e => {
    console.error(e)
  })
}
app.post('/add_todo', add.add_todo)
