// Esse arquivo terá a responsabilidade de configurar o servidor express
// O servidor será configurado no objeto app
const express = require('express');
const config = require('config');
const webRoutes = require('../routes/web');
const apiRoutes = require('../routes/api');
const app = express();

// Guardando uma variável chamada port dentro do objeto app
app.set("port", process.env.PORT || config.get("server.port"));
// Render de views utilizando o pacote hbs no express como "view engine" ou "template engine"
app.set("view engine", "hbs");
// Define as rotas estáticas para os arquivos da pasta public
app.use(express.static("./public"));
// middleware do Express que é usado para fazer o parsing dos dados enviados pelo cliente através de formulários HTML
app.use(express.urlencoded({ extended: false }));
// Defino aque irá utilizar o arquivo routes/web.js p/ configurar as rotas do tipo WEB
app.use(webRoutes);
// Defino aque irá utilizar o arquivo routes/api.js p/ configurar as rotas do tipo API
app.use(apiRoutes);
module.exports = app;