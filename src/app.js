require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const courseRoutes = require('./routes/Courses'); 

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Banco conectado");
  })
  .catch((error) => {
    console.log("Erro ao conectar com o banco: ", error);
  });

// Rotas
app.use("/", courseRoutes); 

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`);
});
