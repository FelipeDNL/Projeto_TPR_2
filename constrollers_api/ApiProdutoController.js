const ProdutoModel = require("../models/ProdutoModel");

/**
 * Controlador para gerenciar produtos através de endpoints da API.
 * @class
 */
class ApiProdutoController {

    /**
     * Recupera todos os produtos.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo todos os produtos.
     */
    async apiGetAll(req, res) {
        try {
            const produtos = await ProdutoModel.findAll();
            return res.send(produtos);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Recupera um único produto pelo ID.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o produto solicitado.
     */
    async apiGetOne(req, res) {
        try {
            const produto = await ProdutoModel.findOne(req.params.produtoId);
            return res.send(produto);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Armazena um novo produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo o produto armazenado.
     */
    async apiStore(req, res) {
        try {
            const produto = new ProdutoModel();
            produto.numero = req.body.produto.numero;
            produto.nome = req.body.produto.nome;
            produto.preco = req.body.produto.preco;
            produto.TipoProduto_id = req.body.produto.TipoProduto_id;
            produto.ingredientes = req.body.produto.ingredientes;
            const result = await produto.save();
            return res.send(result);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Atualiza um produto existente.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o produto atualizado.
     */
    async apiUpdate(req, res) {
        try {
            const produto = await ProdutoModel.findOne(req.params.produtoId);
            produto.numero = req.body.produto.numero;
            produto.nome = req.body.produto.nome;
            produto.preco = req.body.produto.preco;
            produto.TipoProduto_id = req.body.produto.TipoProduto_id;
            produto.ingredientes = req.body.produto.ingredientes;
            const result = await produto.update();
            return res.send(result);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Exclui um produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta indicando o status da exclusão.
     */
    async apiDestroy(req, res) {
        try {
            const produto = await ProdutoModel.findOne(req.params.produtoId);
            const result = await produto.delete();
            return res.send(result);
        } catch (error) {
            return res.send(error);
        }
    }
}

module.exports = new ApiProdutoController();