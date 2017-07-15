const express = require('express')
const config = require('./config')
const init = require('./init')
const serve_static = require('serve-static')
const todos = require('./route_handlers/todos')
const auth = require('./middleware/auth')
let app = express()
app.use(serve_static(__dirname+'/public', {index: false}))
app.get('/', auth.require_auth({otherwise: '/login'}),
  auth.require_no_auth({otherwise: '/lists'}))
app.use(auth.require_auth({otherwise: '/login'}))
app.get('/api/todos', todos.get_all)
app.listen(config.http_port,
  () => console.log(`Listening on 0.0.0.0:${config.http_port}`))
if (config.debug) {
  init().catch(e => {
    console.error(e)
  })
}
