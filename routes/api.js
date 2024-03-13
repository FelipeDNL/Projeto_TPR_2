const express = require("express")
const router = express.Router()
const DataBase = require('../config/Database')

//Rotas API do Produto
router.get("/produto", async (request, response) => {
    const produtos = await DataBase.executeSQLQuery("SELECT * FROM Produto");
    response.render("Produto/index", { produtos: produtos });
});

//Rotas API do TipoProduto
router.get("/api/tipoproduto", async (request, response) => {
    const tipoProdutos = await DataBase.executeSQLQuery("SELECT * FROM TipoProduto");
    response.send(tipoProdutos)
})

module.exports = router;
//