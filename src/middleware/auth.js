let E = module.exports

E.require_auth = ({otherwise}) => {
  return (req, res, next) => {
    if (req.user) {
      return next()
    }
    if (otherwise) {
      return res.redirect(otherwise)
    }
    throw new Error('This code path is not implemented')
  }
}

E.require_no_auth = ({otherwise}) => {
  return (req, res, next) => {
    if (!req.user) {
      return next()
    }
    if (otherwise) {
      return res.redirect(otherwise)
    }
    throw new Error('This code path is not implemented')
  }
}
