const express = require("express");
const webProdutoController = require("../controllers_web/WebProdutoController");
const webTipoProdutoController = require("../controllers_web/WebTipoProdutoController");
const webMesaController = require("../controllers_web/WebMesaController");
const router = express.Router();

// Rotas de TipoProduto
router.get("/tipoproduto", webTipoProdutoController.index);
router.get("/tipoproduto/create", webTipoProdutoController.create);
router.post("/tipoproduto", webTipoProdutoController.storeValidationRules, webTipoProdutoController.store);
router.get("/tipoproduto/:tipoProdutoId", webTipoProdutoController.show);
router.get("/tipoproduto/:tipoProdutoId/edit", webTipoProdutoController.edit);
router.put("/tipoproduto/:tipoProdutoId", webTipoProdutoController.updateValidationRules, webTipoProdutoController.update);
router.delete("/tipoproduto/:tipoProdutoId", webTipoProdutoController.destroy);

// Rotas de Produto
router.get("/produto", webProdutoController.index);
router.get("/produto/create", webProdutoController.create);
router.post("/produto", webProdutoController.storeValidationRules, webProdutoController.store);
router.get("/produto/:produtoId", webProdutoController.show);
router.get("/produto/:produtoId/edit", webProdutoController.edit);
router.put("/produto/:produtoId", webProdutoController.updateValidationRules, webProdutoController.update);
router.delete("/produto/:produtoId", webProdutoController.destroy);

// Rotas de Mesa
router.get("/mesa", webMesaController.index);
router.get("/mesa/create", webMesaController.create);
router.post("/mesa", webMesaController.storeValidationRules, webMesaController.store);
router.get("/mesa/:mesaId", webMesaController.show);
router.get("/mesa/:mesaId/edit", webMesaController.edit);
router.put("/mesa/:mesaId", webMesaController.updateValidationRules, webMesaController.update);
router.delete("/mesa/:mesaId", webMesaController.destroy);

// Demais rotas ainda sem controlador (iremos criar um controlador para essas rotas no futuro)
router.get("/recurso", async (request, response) => {
    response.render("recurso/index", { layout: "layout/main", title: "Index de Recurso" });
});
router.get("/", async (request, response) => {
    response.render("index", { layout: "layout/main", title: "Index" });
});

module.exports = router;
