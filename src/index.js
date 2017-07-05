const express = require('express')
const serve_static = require('serve-static')
let app = express()
app.get('/hi', (req, res) => res.send('hi man'))
app.use(serve_static(__dirname+'/public'))
app.listen(80, () => console.log('listening on :80'))
