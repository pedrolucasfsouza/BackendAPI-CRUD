const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const authMiddleware = require('./middlewares/auth.middlware');
const cors = require('cors');

// Iniciando o App
const app = express();
app.use(express.json());
app.use(cors());

//requisita que toda requisição passe por esse Middlware.
app.use(authMiddleware);

//iniciando o DB
mongoose.connect('mongodb://localhost:27017/nodeapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

requireDir('./models');

app.use('/api', require('./routes'));

app.listen(3001);
