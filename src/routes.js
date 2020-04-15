const express = require('express');
const routes = express.Router();
const protect = require('./middlewares/protect.middlare');
const UserController = require('./controllers/UserController');

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.get('/users/:nome', UserController.nomeById);
routes.delete('/users/:id', UserController.destroy);
routes.post('/auth/login', UserController.auth);
routes.get('/logado', protect, UserController.logado);

module.exports = routes;
