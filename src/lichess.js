const req = require('request-promise')
const config = require('config')
let E = module.exports
E.fetch_user = ()=> {
  return req({
    url: `https://lichess.org/api/${config.lichess_id}`
  }).catch(e=> {

  })
}
