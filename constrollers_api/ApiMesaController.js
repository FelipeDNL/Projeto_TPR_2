const MesaModel = require("../models/MesaModel");

/**
 * Controlador para gerenciar mesas através de endpoints da API.
 * @class
 */
class ApiMesaController {

    /**
     * Recupera todas as mesas.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo todas as mesas.
     */
    async apiGetAll(req, res) {
        try {
            const mesas = await MesaModel.findAll();
            return res.send(mesas);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Recupera uma única mesa pelo ID.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo a mesa solicitada.
     */
    async apiGetOne(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            return res.send(mesa);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Armazena uma nova mesa.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo a mesa armazenada.
     */
    async apiStore(req, res) {
        try {
            const mesa = new MesaModel();
            mesa.numero = req.body.mesa.numero;
            mesa.estado = req.body.mesa.estado;
            const result = await mesa.save();
            return res.send(result);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Atualiza uma mesa existente.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo a mesa atualizada.
     */
    async apiUpdate(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            mesa.numero = req.body.mesa.numero;
            mesa.estado = req.body.mesa.estado;
            const result = await mesa.update();
            return res.send(result);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Exclui uma mesa.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta indicando o status da exclusão.
     */
    async apiDestroy(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            const result = await mesa.delete();
            return res.send(result);
        } catch (error) {
            return res.send(error);
        }
    }
}

module.exports = new ApiMesaController();