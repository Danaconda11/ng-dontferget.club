const express = require('express')
const config = require('./config')
const init = require('./init')
const serve_static = require('serve-static')
const todos = require('./route_handlers/todos')
let app = express()
app.get('/api/todos', todos.get_all)
app.use(serve_static(__dirname+'/public'))
app.listen(config.http_port,
  () => console.log(`Listening on 0.0.0.0:${config.http_port}`))
if (config.debug) {
  init().catch(e => {
    console.error(e)
  })
}
