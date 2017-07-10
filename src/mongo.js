const mongo = require('mongodb').MongoClient
const config = require('./config')
let connect = ()=> {
  return mongo.connect(`mongodb://${config.mongo_host}/${config.mongo_database}`)
}

module.exports = {
  connect
}
