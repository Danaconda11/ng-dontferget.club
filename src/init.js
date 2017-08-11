const mongo = require('./mongo')
const config = require('./config')

let create_dummy_records = () => {
  return mongo.connect().then(db => {
    return db.createCollection("todos", {}).then(() => {
      return db.collection('todos').insertOne({title : 'test', completed : false})
    }).then(() => {
      return db.collection('users').update({username: 'josh'},
        {$set: {username: 'josh'}}, {upsert: true})
    })
  })
}

module.exports = () => {
  return create_dummy_records()
}
