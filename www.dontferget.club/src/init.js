//test
const mongo = require('./mongo')
let create_dummy_records = ()=> {
  return mongo.connect().then(db=> {
    return db.createCollection("test", {}).then(()=> {
      return db.collection('test').insertOne({name : 'test'})
    })
  })
}

module.exports = () => {
  return create_dummy_records()
}
