const express = require('express')
<<<<<<< HEAD
const config = require('./config')
const serve_static = require('express-static')
const init = require('./init')
=======
const serve_static = require('serve-static')
>>>>>>> 18cfb559f00abf1ce2c664cfcd4311758992e7c9
let app = express()
app.get('/hi', (req, res) => res.send('hi man'))
app.use(serve_static(__dirname+'/public'))
app.listen(80, () => console.log('listening on :80'))
if (config.debug) {
  init().then(res => {
    console.log('Init complete')
  }).catch(e => {
    console.error(e);
  })
}
