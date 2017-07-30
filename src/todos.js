const mongo = require('./mongo')
E = module.exports

// TODO daniel: get rid of the duplicated pattern
// connect().then(db.collection('todos')) -> mongo.collection('todos') wrapper
E.find_by_id = id_string => {
  return mongo.connect().then(db => {
    return db.collection('todos').findOne({_id: mongo.ObjectId(id_string)})
  })
}

E.insert = todo => {
  return mongo.connect().then(db => {
    return db.collection('todos').insert(todo)
  })
}

E.find_all = (options = {}) => {
  let include = options.include || []
  let stages = []
  if (include.includes('list')) {
    stages.push(
      {
        $lookup: {
          from: 'lists',
          localField: 'list',
          foreignField: '_id',
          as: 'list',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          completed: 1,
          starred: 1,
          list: {$arrayElemAt: ['$list', 0]},
        },
      }
    )
  }
  return mongo.connect().then(db => {
    return db.collection('todos').aggregate(stages).toArray()
  })
}

E.update = (_id, update) => {
  return mongo.connect().then(db => {
    return db.collection('todos')
    .update({_id: mongo.ObjectId(_id)}, {$set: update})
  })
}

E.remove = _id => {
  return mongo.connect().then(db => {
    return db.collection('todos').remove({_id:  mongo.ObjectId(_id)})
  })
}
