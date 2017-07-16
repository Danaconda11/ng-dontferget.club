const serve_static = require('serve-static')
const path = require('path')
const util = require('util')
let E = module.exports
let base_dir = path.join(__dirname, 'public')

E.static = () => serve_static(base_dir, {index: false})

E.send = (res, file) => {
  return util.promisify(res.sendFile.bind(res))(file, {root: base_dir})
}

E.send_file = path => {
  return (req, res, next) => {
    E.send(res, path).catch(err => {
      next(err)
    })
  }
}
