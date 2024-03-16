const express = require("express")
const router = express.Router()
const DataBase = require('../config/Database')

//Rotas API do Produto
router.get("/api/produto", async (request, response) => {
    const produtos = await DataBase.executeSQLQuery("SELECT * FROM produto");
    response.send(produtos)
})

//Rotas API do TipoProduto
router.get("/api/tipoproduto", async (request, response) => {
    const tipoProdutos = await DataBase.executeSQLQuery("SELECT * FROM TipoProduto");
    response.send(tipoProdutos)
})

//rota create 
router.get("/produto/create", async (request, response) => {
    const tipoProdutos = await DataBase.executeSQLQuery("SELECT * FROM TipoProduto");
    response.render("Produto/create", {tipoProdutos: tipoProdutos});
});

module.exports = router;