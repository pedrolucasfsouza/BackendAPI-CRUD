const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const TOKEN_APP_KEY = process.env.npm_package_config_APP_TOKEN_KEY;

module.exports = {
  async register(req, res) {
    const user = await User.create(req.body);

    return res.json(user);
  },
  async nomeById(req, res) {
    const nome = await User.find({userName: req.params.nome});

    return res.json(nome);
  },
  async destroy(req, res) {
    await User.findByIdAndRemove(req.params.id);
    return res.send();
  },

  async logado(req, res) {
    res.send('você está na área restrista');
  },

  async index(req, res) {
    const users = await User.find();
    return res.json(users);
  },
  async auth(req, res) {
    //procura no BD pelo e-mail fornnecido pelo usuário
    const user = await User.findOne({email: req.body.email});

    //se o usuário NÃO existe no BD, retorna 'usuário n existe'
    if (!user) {
      return res.status(404).send('usuario não existe');
    }
    //se o password passado pelo usuário é = ao password BD
    if (user.password === req.body.password) {
      //logado

      // gera o token
      const token = jwt.sign({user}, TOKEN_APP_KEY);
      //retorna o token pro usuário (aqui o usuário está com o token contido no header)
      return res.status(200).send({auth: true, token: token});
    } else {
      //se o user digitou a senha errada, cai nessa condição
      return res.status(500).send('Senha digitada é inválida');
    }
  },
};
