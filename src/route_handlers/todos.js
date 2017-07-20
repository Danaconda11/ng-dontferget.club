const mongo = require('../mongo')
E = module.exports

E.add_todo = (req, res, next) => {
  console.log(`in node now`, req.body)
  return mongo.connect().then(db=> {
    return db.collection('todos').insert(req.body).then(insert=> {
      let id = mongo.ObjectId(insert.insertedIds[0])
      return db.collection('todos').findOne({_id: id}).then(todo=> {
        res.json(todo)
      })
    })
  }).catch(err=> {
    console.log(err)
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    })
  })
}
