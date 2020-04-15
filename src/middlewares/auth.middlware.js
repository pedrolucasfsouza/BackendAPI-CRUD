const TOKEN_APP_KEY = process.env.npm_package_config_APP_TOKEN_KEY;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (token === undefined) {
    next();
    return;
  }
  try {
    const decoded = jwt.decode(token, TOKEN_APP_KEY);
    if (decoded.user !== undefined) {
      //token valido
      req.authUser = decoded.user;
      next();
    } else {
      throw new Error('este token não é valido');
    }
  } catch (error) {
    console.log(error);
    //token invalido
    res.status(400).send('usuário não autorizado');
  }
};
