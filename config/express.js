// Esse arquivo terá a responsabilidade de configurar o servidor express
// O servidor será configurado no objeto app

const express = require('express');
const config = require('config');
const app = express();
const webRoutes = require("../routes/web");
const apiRoutes = require("../routes/api");

// Define as rotas estáticas para os arquivos da pasta public
app.use(express.static("./public"));
// Guardando uma variável chamada port dentro do objeto app
app.set("port", process.env.PORT || config.get("server.port"));
// Render de views utilizando o pacote hbs no express como "view engine" ou "template engine"
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: false }));
// Defino aque irá utilizar o arquivo routes/web.js p/ configurar as rotas do tipo WEB
app.use(webRoutes);
// Defino aque irá utilizar o arquivo routes/api.js p/ configurar as rotas do tipo API
app.use(apiRoutes);

module.exports = app;
