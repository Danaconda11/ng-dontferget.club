const mongo = require('mongodb')
const config = require('./config')
let E = module.exports
E.connect = () => {
  return mongo.MongoClient.connect(`mongodb://${config.mongo_host}/${config.mongo_database}`)
}
E.ObjectId = mongo.ObjectId
