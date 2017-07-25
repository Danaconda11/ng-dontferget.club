const lichess = require('../lichess')
let E = module.exports
E.fetch_user = (req, res, next)=> {
  return lichess.fetch_user().then(response=> {
    res.json(response)
  }).catch(e=> {
    next(e)
  })
}
