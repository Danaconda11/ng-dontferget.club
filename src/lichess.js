const rq = require('request-promise')
const config = require('./config')
let E = module.exports
E.fetch_user = ()=> {
  console.log(config);
  return rq({
    url: `https://lichess.org/api/user/${config.lichess_id}`,
  })
  .catch(e=> {
    console.log(e);
  })
}
