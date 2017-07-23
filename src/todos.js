
const mongo = require('./mongo')
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
E.find_all = () => {
  return mongo.connect().then(db=> {
    return db.collection('todos').find({}).toArray()
  })
}
E.remove = doc => {
  return mongo.connect().then(db=> {
    return db.collection('todos').remove({title: doc.title})
  })
}
