const serve_static = require('serve-static')
const path = require('path')
let E = module.exports
let base_dir = path.join(__dirname, 'public')

E.static = () => serve_static(base_dir, {index: false})

E.send = (res, file) => new Promise((resolve, reject) => {
  res.sendFile(file, {root: base_dir}, e => {
    if (e) {
      return reject(e)
    }
    resolve()
  })
})
