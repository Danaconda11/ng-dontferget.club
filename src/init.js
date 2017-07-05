const mongo = require('mongo')

let create_dummy_records = () => {
  let conn = mongo.get_connection()

}

module.exports = () => {
  return create_dummy_records()
}
