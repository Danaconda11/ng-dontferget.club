const mongo = require('mongodb').MongoClient
const config = require('./config')
let E = module.exports
E.connect = () => {
  return mongo.connect(`mongodb://${config.mongo_host}/${config.mongo_database}`)
}
