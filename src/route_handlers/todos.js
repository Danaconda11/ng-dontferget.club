const _ = require('lodash')
const todos = require('../todos')
E = module.exports

E.add = (req, res, next) => {
  return todos.insert(req.body).then(insert => {
    return todos.find_by_id(insert.insertedIds[0])
  }).then(todo => {
    res.json(todo)
  }).catch(err => {
    next(err)
  })
}

E.get_all = (req, res, next) => {
  return todos.find_all().then(docs => {
    res.json(docs)
  }).catch(err => {
    next(err)
  })
}

E.update = (req, res, next) => {
  let update = req.body
  let id = req.params.id
  if (!id || _.isEmpty(update)) {
    return res.status(400).json({error: 'Invalid update'})
  }
  return todos.update(id, update).then(result => {
    return todos.find_by_id(id)
  }).then(todo => {
    res.json(todo)
  }).catch(err => {
    next(err)
  })
}

E.remove = (req, res, next) => {
  return todos.remove(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    next(err)
  })
}
