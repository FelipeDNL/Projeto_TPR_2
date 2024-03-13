//o objetivo desse arquivo é configurar o express
const express = require("express");
const config = require("config");
const app = express();
const webRoutes = require("../routes/web");
const apiRoutes = require("../routes/api");

//define as rotas estáticas para os arquivos da pasta public
app.use(express.static("./public"));

//guardando uma variavel chamada port dentro do objeto app
app.set("port", process.env.PORT || config.get("server.port"));

//render de views utilizando o pacote hbs no express como "view engine" ou "template engine"
app.set("view engine", "hbs");

//utilizar o arquivo routes/web.js p/ configurar as rotar do tipo WEB
app.use(webRoutes);
//utilizar o arquivo routes/api.js p/ configurar as rotar do tipo API
app.use(apiRoutes);

// exporta o objeto app configurado
module.exports = app;