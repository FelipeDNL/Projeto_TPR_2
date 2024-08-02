// Esse arquivo terá a responsabilidade de configurar o servidor express
// O servidor será configurado no objeto app

const HbsConfigureCustomHelpers = require("./HbsConfigureCustomHelpers");
const Crypto = require("crypto");
const express = require('express');
const methodOverride = require("method-override");
const session = require("express-session");
const csurf = require("csurf")
const config = require('config');
const app = express();
const webRoutes = require("../routes/web");
const apiRoutes = require("../routes/api");

// Configura a chave port dentro do objeto app
app.set("port", process.env.PORT || config.server.port);
// Configura a chave "view engine" dentro do objeto app, que define o render ou "Template Engine" de views utilizando o pacote hbs no express
app.set("view engine", "hbs");
// Configura os CustomHelpers do pacote hbs
HbsConfigureCustomHelpers.run();

// Configura o middleware do Express que define as rotas estáticas para os arquivos da pasta public
app.use(express.static("./public"));
// Configura o middleware do Express que analisa dados codificados em URL que são enviados para o servidor.
app.use(express.urlencoded({ extended: false }));
// Configura o method-override no express para poder usar put ou delete nos <form> do HTML
app.use(methodOverride("_method"));
// Configura o middleware de session
app.use(session({
    secret: Crypto.randomBytes(32).toString('hex'), // chave secreta para assinar o cookie da session
    resave: false,
    saveUninitialized: true
}));

//connfigura o midware para fazer o parse no corpo da requisição e identificar dados no formato json 
app.use(express.json());

// Defino aque irá utilizar o arquivo routes/api.js p/ configurar as rotas do tipo API
app.use(apiRoutes);

//define um novo middleware
app.use(csurf());

// Defino aque irá utilizar o arquivo routes/web.js p/ configurar as rotas do tipo WEB
app.use(webRoutes);


module.exports = app;