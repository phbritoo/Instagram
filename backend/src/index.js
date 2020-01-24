// importa a biblioteca
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
//Permitir que o front acesse o back em urls diferentes
const cors = require("cors");

//cria uma variavel e chama a funcao
const app = express();

//Aceitar conexoes http ou websocket
const server = require("http").Server(app);
const io = require("socket.io")(server);

//Conexao com o banco
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-crpsb.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//definindo acesso para todas as requisições
app.use((req, res, next) => {
  req.io = io;
  next();
});

//liberar acesso para a aplicação acessar o backend
app.use(cors());

//Rota para acessar arquivos estaticos das fotos > http://localhost:3333/files/Screenshot_1.jpg
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));

// funcao express cria um servidor
app.listen(3333);
