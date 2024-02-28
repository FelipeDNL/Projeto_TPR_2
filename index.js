// O objetivo desse arquivo é configurar o express
const express = require("express");
const config = require("config");
const DataBase = require("./DataBase");
const app = express();

// Guardando dentro da variável app uma propriedade
app.set("port", process.env.PORT || config.get("server.port"));
app.get('/produto', async (request, response) => {
    const resposta = await DataBase.executeSQLQuery("select * from Produto");
    response.send(resposta);
});

// exporta o objeto app configurado
module.exports = app;