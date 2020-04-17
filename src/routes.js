const express = require('express');
const routes = express.Router();
const protect = require('./middlewares/protect.middlare');
const UserController = require('./controllers/UserController');

routes.post('/users/register', UserController.register);
routes.post('/auth/login', UserController.auth);
routes.get('/logado', protect, UserController.logado);
routes.get('/users', protect, UserController.index);

module.exports = routes;

//login (post)
//registro (post)
//logado (get)
//listar usuário (get)
