const serve_static = require('serve-static')
const path = require('path')
const util = require('util')
let E = module.exports
let public_dir = path.join(__dirname, 'public')
let modules_dir = path.join(__dirname, 'node_modules')

E.public = () => serve_static(public_dir, {index: false})

E.node_modules = () => serve_static(modules_dir, {index: false})

E.send = (res, file) => {
  return util.promisify(res.sendFile.bind(res))(file, {root: public_dir})
}

E.send_file = path => {
  return (req, res, next) => {
    E.send(res, path).catch(err => {
      next(err)
    })
  }
}
