const mongo = require('../mongo')
E = module.exports

E.add_todo = (req, res, next) => {
  console.dir(req.body);
  return mongo.connect().then(db=> {
    return db.collection('todos').insert(req.body.var1).then(()=> {
      res.redirect('/')
    })
  }).catch(err=> {
    console.log(err);
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    })
  })
}
