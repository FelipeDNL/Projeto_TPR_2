const PedidoModel = require("../models/PedidoModel");

/**
 * Controlador para gerenciar pedidos através de endpoints da API.
 * @class
 */
class ApiPedidoController {
    
    /**
     * Recupera todos os pedidos.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo todos os pedidos.
     */
    async apiGetAll(req, res) {
        try {
            const pedidos = await PedidoModel.findAll();
            return res.send(pedidos);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Recupera um único pedido pelo ID.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.pedidoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o pedido solicitado.
     */
    async apiGetOne(req, res) {
        try {
            const pedido = await PedidoModel.findOne(req.params.pedidoId);
            return res.send(pedido);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Armazena um novo pedido.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo o pedido armazenado.
     */
    async apiStore(req, res) {
        try {
            const pedido = new PedidoModel();
            pedido.Mesa_id = req.body.pedido.Mesa_id;
            pedido.estado = req.body.pedido.estado;
            const result = await pedido.save();
            return res.send(result);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Atualiza um pedido existente.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.pedidoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o pedido atualizado.
     */
    async apiUpdate(req, res) {
        try {
            const pedido = await PedidoModel.findOne(req.params.pedidoId);
            pedido.Mesa_id = req.body.pedido.Mesa_id;
            pedido.estado = req.body.pedido.estado;
            const result = await pedido.update();
            return res.send(result);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Exclui um pedido.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.pedidoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta indicando o status da exclusão.
     */
    async apiDestroy(req, res) {
        try {
            const pedido = await PedidoModel.findOne(req.params.pedidoId);
            const result = await pedido.delete();
            return res.send(result);
        } catch (error) {
            return res.send(error);
        }
    }
}

module.exports = new ApiPedidoController();