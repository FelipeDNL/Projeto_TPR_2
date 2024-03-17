const express = require("express");
const router = express.Router();
const DataBase = require("../config/Database");
const TipoProdutoModel = require("../models/TipoProdutoModel")

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
    const tipoProdutos = await TipoProdutoModel.findAll();
    response.render("TipoProduto/index", { tipoProdutos: tipoProdutos });
});

//rotar WEB do recurso
router.get("/recurso", async (request, response) => {
    response.render("Recurso/index");
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
    response.redirect("/produto");
});

router.post("/tipoproduto", async (request, response) => {
    const tipoProduto = new TipoProdutoModel();
    tipoProduto.descricao = request.body.descricao;
    const result = await tipoProduto.save();
    response.redirect("/tipoproduto");
});

//exporta o objeto router configurado
module.exports = router;