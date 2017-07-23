const todos = require('../todos')
E = module.exports
E.add = (req, res, next) => {
  return todos.insert(req.body).then(insert=> {
    return todos.find_by_id(insert.insertedIds[0])
  }).then(todo=> {
    res.json(todo)
  }).catch(err=> {
    next(err)
  })
}
E.get_all = (req, res, next) => {
  return todos.find_all().then(docs=> {
    res.json(docs)
  }).catch(err=> {
    next(err)
  })
}
E.remove = (req, res, next)=> {
  console.log(`request body in todos`, req.body);
  return todos.remove(req.body).then(result=> {
    console.log(`route handler result`, result);
    res.json(result)
  }).catch(err=> {
    next(err)
  })
}
