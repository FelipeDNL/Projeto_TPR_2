const express = require("express");
const router = express.Router();
const DataBase = require("../config/Database");

//rota raiz
router.get("/", async (request, response) => {
    response.render("index");
});

//rotas WEB do produto
router.get("/produto", async (request, response) => {
    const produtos = await DataBase.executeSQLQuery(`SELECT Produto.*,
                                                        TipoProduto.descricao as TipoProduto_descricao
                                                        FROM Produto
                                                        JOIN TipoProduto ON Produto.TipoProduto_id = TipoProduto.id`);
    response.render("Produto/index", { produtos: produtos });
});

//rotas API do TipoProduto
router.get("/tipoproduto", async (request, response) => {
    const tipoProdutos = await DataBase.executeSQLQuery("SELECT * FROM TipoProduto");
    response.render("TipoProduto/index", { tipoProdutos: tipoProdutos });
});

//rotar WEB do recurso
router.get("/recurso", async (request, response) => {
    response.render("Recurso/index");
});

//rota create 
router.get("/produto/create", async (request, response) => {
    const tipoProdutos = await DataBase.executeSQLQuery("SELECT * FROM TipoProduto");
    response.render("Produto/create", { tipoProdutos: tipoProdutos });
});

//exporta o objeto router configurado
module.exports = router;