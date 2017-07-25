const lichess = require('./lichess')
let E = module.exports
E.fetch_user = ()=> {
  return lichess.fetch_user()
}
