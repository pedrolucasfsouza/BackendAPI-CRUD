const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const TOKEN_APP_KEY = process.env.npm_package_config_APP_TOKEN_KEY;

module.exports = {
  async store(req, res) {
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
    if (req.authUser) {
      res.send('funcinou, ' + req.authUser.userName);
    } else {
      res.status(400).send('infelizmente você não está logado ainda');
    }
  },
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  },
  async auth(req, res) {
    const user = await User.findOne({email: req.body.email});
    console.log(user, req.body);
    if (user.password === req.body.password) {
      //logado
      const token = jwt.sign({user}, TOKEN_APP_KEY);
      res.status(200).send({token});
    } else {
      //usuário senha inválida
      res.status(400).send('Inválido');
    }
  },
};
