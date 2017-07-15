let env = process.env
module.exports = {
  debug: env.DEBUG,
  http_port: 80,
  mongo_host: env.MONGO_HOST,
  mongo_database: env.MONGO_DATABASE,
  auto_login: env.DEBUG,
}
