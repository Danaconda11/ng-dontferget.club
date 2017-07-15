const express = require('express')
const config = require('./config')
const init = require('./init')
const todos = require('./route_handlers/todos')
const auth = require('./middleware/auth')
const user = require('./route_handlers/user')
const files = require('./files')
const body_parser = require('body-parser')
let app = express()
app.use(files.static())
app.use(user.logged_in)
app.use(body_parser.urlencoded({extended: false}))
app.get('/', auth.require_auth({otherwise: '/login'}),
  auth.require_no_auth({otherwise: '/lists'}))
app.get('/login', auth.require_no_auth({otherwise: '/'}), user.login_page)
app.post('/login', user.login)
app.get('/logout', user.logout)
app.use(auth.require_auth({otherwise: '/login'}))
app.get('/account', user.view_account)
app.get('/api/todos', todos.get_all)
app.listen(config.http_port,
  () => console.log(`Listening on 0.0.0.0:${config.http_port}`))
if (config.debug) {
  init().catch(e => {
    console.error(e)
  })
}
