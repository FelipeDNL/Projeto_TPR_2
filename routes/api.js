const express = require("express");
const apiProdutoController = require("../constrollers_api/ApiProdutoController");
const apiTipoProdutoController = require("../constrollers_api/apiTipoProdutoController");
const apiMesaController = require("../constrollers_api/ApiMesaController");
const apiPedidoController = require("../constrollers_api/ApiPedidoController");
const apiPedidoProdutoController = require("../constrollers_api/ApiPedidoProdutoController");
const router = express.Router();

// Rotas de Produto
router.get("/api/produto", apiProdutoController.apiGetAll); // Devolver todos os Produtos no formato JSON
router.get("/api/produto/:produtoId", apiProdutoController.apiGetOne); // Devolver um Produto no formato JSON
router.post("/api/produto", apiProdutoController.apiStore); // Armazenar um Produto
router.put("/api/produto/:produtoId", apiProdutoController.apiUpdate); // Atualizar um Produto
router.delete("/api/produto/:produtoId", apiProdutoController.apiDestroy); // Remover um Produto

// Rotas de TipoProduto
router.get("/api/tipoproduto", apiTipoProdutoController.apiGetAll); // Devolver todos os TipoProdutos no formato JSON
router.get("/api/tipoproduto/:tipoProdutoId", apiTipoProdutoController.apiGetOne); // Devolver um TipoProduto no formato JSON
router.post("/api/tipoproduto", apiTipoProdutoController.apiStore); // Armazenar um TipoProduto
router.put("/api/tipoproduto/:tipoProdutoId", apiTipoProdutoController.apiUpdate); // Atualizar um TipoProduto
router.delete("/api/tipoproduto/:tipoProdutoId", apiTipoProdutoController.apiDestroy); // Remover um TipoProduto

// Rotas de Mesa
router.get("/api/mesa", apiMesaController.apiGetAll); // Devolver todos as Mesas no formato JSON
router.get("/api/mesa/:mesaId", apiMesaController.apiGetOne); // Devolver uma Mesa no formato JSON
router.post("/api/mesa", apiMesaController.apiStore); // Armazenar uma Mesa
router.put("/api/mesa/:mesaId", apiMesaController.apiUpdate); // Atualizar uma Mesa
router.delete("/api/mesa/:mesaId", apiMesaController.apiDestroy); // Remover uma Mesa

// Rotas de Pedido
router.get("/api/pedido", apiPedidoController.apiGetAll); // Devolver todos os Pedidos no formato JSON
router.get("/api/pedido/:pedidoId", apiPedidoController.apiGetOne); // Devolver um Pedido no formato JSON
router.post("/api/pedido", apiPedidoController.apiStore); // Armazenar um Pedido
router.put("/api/pedido/:pedidoId", apiPedidoController.apiUpdate); // Atualizar um Pedido
router.delete("/api/pedido/:pedidoId", apiPedidoController.apiDestroy); // Remover um Pedido

// Rotas de PedidoProduto
router.get("/api/pedidoproduto", apiPedidoProdutoController.apiGetAll); // Devolver todos os PedidoProdutos no formato JSON
router.get("/api/pedidoproduto/:pedidoId/:produtoId", apiPedidoProdutoController.apiGetOne); // Devolver um PedidoProduto no formato JSON
router.post("/api/pedidoproduto", apiPedidoProdutoController.apiStore); // Armazenar um PedidoProduto
router.put("/api/pedidoproduto/:pedidoId/:produtoId", apiPedidoProdutoController.apiUpdate); // Atualizar um PedidoProduto
router.delete("/api/pedidoproduto/:pedidoId/:produtoId", apiPedidoProdutoController.apiDestroy); // Remover um PedidoProduto
router.get("/api/pedidoproduto/ativo/mesa/:mesaId", apiPedidoProdutoController.apiGetAllActiveByMesaId); // Busca os PedidoProdutos ativos em uma mesa
router.get("/api/pedidoproduto/inativo/mesa/:mesaId", apiPedidoProdutoController.apiGetAllInaciveByMesaId); // Busca os PedidoProdutos inativos em uma mesa

module.exports = router;
