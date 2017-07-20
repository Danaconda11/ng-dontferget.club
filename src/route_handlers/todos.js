const mongo = require('../mongo')
E = module.exports
E.find_by_id = id_string => {
  return mongo.connect().then(db=> {
    return db.collection('todos').findOne({_id: mongo.ObjectId(id_string)})
  })
}
E.insert = todo => {
  return mongo.connect().then(db=> {
    return db.collection('todos').insert(todo)
  })
}
E.add = (req, res, next) => {
  console.log(`in node now`, req.body)
  return E.insert(req.body).then(insert=> {
    return E.find_by_id(insert.insertedIds[0])
  }).then(todo=> {
    res.json(todo)
  }).catch(err=> {
    console.log(err)
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    })
  })
}
