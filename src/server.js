const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const authMiddleare = require('./middlewares/auth.middlware');

// Iniciando o App
const app = express();
app.use(express.json());

app.use(authMiddleare);

//iniciando o DB
mongoose.connect('mongodb://localhost:27017/nodeapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

requireDir('./models');

app.use('/api', require('./routes'));

app.listen(3001);
