module.exports = (req, res, next) => {
  if (req.authUser) {
    next();
  } else {
    return res.status(400).send('infelizmente você não está logado ainda');
  }
};
