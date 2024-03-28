// Esse arquivo terá a responsabilidade de configurar o servidor express
// O servidor será configurado no objeto app

const HbsConfigureCustomHelpers = require("./HbsConfigureCustomHelpers");
const express = require('express');
const methodOverride = require("method-override");
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
// Configura o middleware do Express que analisa dados codificados em URL que são enviados para o servidor.
app.use(express.urlencoded({ extended: false }));
// Configura o method-override no express para poder usar put ou delete nos <form> do HTML
app.use(methodOverride("_method"));
// Configura os CustomHelpers do pacote hbs
HbsConfigureCustomHelpers.run();
// Defino aque irá utilizar o arquivo routes/web.js p/ configurar as rotas do tipo WEB
app.use(webRoutes);
// Defino aque irá utilizar o arquivo routes/api.js p/ configurar as rotas do tipo API
app.use(apiRoutes);

module.exports = app;