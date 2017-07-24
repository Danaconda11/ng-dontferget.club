const lichess = require('lichess-api');
const config = require('./config')
module.exports = {

}

let get_user() {
  return new Promise((resolve, reject)=> {
    resolve(lichess.user(config.LICHESS_ID))
  })

}
