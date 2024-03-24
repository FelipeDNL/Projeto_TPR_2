const express = require("express");
const webProdutoController = require("../controllers_web/WebProdutoController");
const webTipoProdutoController = require("../controllers_web/WebTipoProdutoController");
const router = express.Router();

// Rotas de TipoProduto
router.get("/tipoproduto", webTipoProdutoController.index);
router.get("/tipoproduto/create", webTipoProdutoController.create);
router.post("/tipoproduto", webTipoProdutoController.store);
router.get("/tipoproduto/:tipoProdutoId", webTipoProdutoController.show);
router.get("/tipoproduto/:tipoProdutoId/edit", webTipoProdutoController.edit);
router.put("/tipoproduto/:tipoProdutoId", webTipoProdutoController.update);
router.delete("/tipoproduto/:tipoProdutoId", webTipoProdutoController.destroy);

// Rotas de Produto
router.get("/produto", webProdutoController.index);
router.get("/produto/create", webProdutoController.create);
router.post("/produto", webProdutoController.store);
router.get("/produto/:produtoId", webProdutoController.show);
router.get("/produto/:produtoId/edit", webProdutoController.edit);
router.put("/produto/:produtoId", webProdutoController.update);
router.delete("/produto/:produtoId", webProdutoController.destroy);

// Demais rotas ainda sem controlador (iremos criar um controlador para essas rotas no futuro)
router.get("/recurso", async (request, response) => {
    response.render("Recurso/index");
});

router.get("/", async (request, response) => {
    response.render("index");
});

module.exports = router;