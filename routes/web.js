const express = require("express");
const router = express.Router();
const DataBase = require('../config/DataBase');
const TipoProdutoModel = require('../models/TipoProdutoModel');

// Rota raiz
router.get("/", async (request, response) => {
    response.render("index");
});

// Rotas WEB de Produto
router.get("/produto", async (request, response) => {
    const produtos = await DataBase.executeSQLQuery(`SELECT Produto.*,
                                                            TipoProduto.descricao
                                                            FROM Produto
                                                     JOIN TipoProduto ON Produto.TipoProduto_id = TipoProduto.id`);
    response.render("Produto/index", { produtos: produtos });
});

router.get("/produto/create", async (request, response) => {
    const tipoProdutos = await TipoProdutoModel.findAll();
    response.render("Produto/create", { tipoProdutos: tipoProdutos });
});

router.post("/produto", async (request, response) => {
    const numero = request.body.numero;
    const nome = request.body.nome;
    const preco = request.body.preco;
    const TipoProduto_id = request.body.TipoProduto_id;
    const ingredientes = request.body.ingredientes;
    const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    const dataAtualizacao = timestamp;
    const dataCriacao = timestamp;
    const result = await DataBase.executeSQLQuery(`INSERT INTO Produto VALUES(null, ?, ?, ?, ?, ?, ?, ?)`,
        [
            numero,
            nome,
            preco,
            TipoProduto_id,
            ingredientes,
            dataAtualizacao,
            dataCriacao
        ]
    );
    //response.send(result);
    response.redirect("/produto");
});

// Rotas WEB de TipoProduto
router.get("/tipoproduto", async (request, response) => {
    const tipoProdutos = await TipoProdutoModel.findAll();
    response.render("TipoProduto/index", { tipoProdutos: tipoProdutos });
});

// Rotas WEB de TipoProduto
router.get("/tipoproduto/create", async (request, response) => {
    response.render("TipoProduto/create");
});

router.post("/tipoproduto", async (request, response) => {
    const tipoProduto = new TipoProdutoModel();
    tipoProduto.descricao = request.body.descricao;
    const result = await tipoProduto.save();
    response.redirect("/tipoproduto");
});

// Rotas WEB de Recurso
router.get("/recurso", async (request, response) => {
    response.render("Recurso/index");
});

module.exports = router;
