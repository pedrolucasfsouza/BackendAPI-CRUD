const TOKEN_APP_KEY = process.env.npm_package_config_APP_TOKEN_KEY;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //variável "token" é igual o valor "Authorization" recebido no header da requisição.
  const token = req.header('Authorization');
  // se o token fornecido pelo usuário for indefinido:
  if (token === undefined) {
    //o usuário será enviado para o próximo middlware.
    next();
    return;
  }
  try {
    //se o usuário possuir token, iremos decodifica-lo abaixo
    const decoded = jwt.decode(token, TOKEN_APP_KEY);

    //o decoded retornará um objeto com o a propriedade "user". logo será decoded.user.
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
