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

//exporta o objeto router configurado
module.exports = router;