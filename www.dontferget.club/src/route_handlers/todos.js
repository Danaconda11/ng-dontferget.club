const mongo = require('../mongo')

var get_all = (req, res, next) => {
  mongo.connect().then(db=> {
    return db.collection('test').find().toArray()
  }).then(docs=> {
    res.json(docs)
  }).catch(e=> {
    res.status(500).send(e)
  })
}

module.exports = {
    get_all
}
