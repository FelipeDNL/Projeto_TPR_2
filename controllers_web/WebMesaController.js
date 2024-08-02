const { param, body, validationResult } = require("express-validator");
const SessionStatusMessageHandler = require("../message_handler/SessionStatusMessageHandler");
const MesaModel = require("../models/MesaModel");

class WebMesaController {
    /**
    * Mostra uma tela com todos os recursos
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    */
    async index(req, res) {
        try {
            const mesas = await MesaModel.findAll();
            return res.render("mesa/index", {
                layout: "layout/main",
                title: "Index de Mesa",
                mesas: mesas,
                message: SessionStatusMessageHandler.getAndClearSessionStatusMessage(req),
                csrfToken: req.csrfToken()
            });
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
            return res.render("mesa/index", {
                layout: "layout/main",
                title: "Index de Mesa",
                mesas: [],
                message: SessionStatusMessageHandler.getAndClearSessionStatusMessage(req),
                csrfToken: req.csrfToken()
            });
        }
    }

    /**
    * Mostra um formulário para criação de um novo recurso
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    */
    async create(req, res) {
        try {
            return res.render("mesa/create", {
                layout: "layout/main",
                title: "Create de Mesa",
                csrfToken: req.csrfToken()
            });
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
            return res.redirect("/mesa");
        }
    }

    /**
    * Regras de validação para o store.
    */
    storeValidationRules = [
        body('numero').isInt({ min: 0 }).withMessage('O número da mesa deve ser um número inteiro maior que -1.')
    ];

    /**
    * Salva um novo recurso no banco de dados
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    */
    async store(req, res) {
        try {
            // Verificar se há erros de validação
            const validation = validationResult(req);
            if (!validation.isEmpty()) {
                throw validation;
            }
            const mesa = new MesaModel();
            mesa.numero = req.body.numero;
            mesa.estado = 'A'; // estado aberta
            const result = await mesa.save();
            SessionStatusMessageHandler.setSessionStatusMessage(req, "success", `Mesa número = ${result.numero} salva com sucesso.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/mesa");
    }

    /**
    * Mostra um recurso específico
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
    */
    async show(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            if (mesa) {
                return res.render("mesa/show", {
                    layout: "layout/main",
                    title: "Show de Mesa",
                    mesa: mesa
                });
            }
            SessionStatusMessageHandler.setSessionStatusMessage(req, "warning", `Mesa com id = ${req.params.mesaId} não encontrada.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/mesa");
    }

    /**
    * Mostra um formulário para editar um recurso específico
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
    */
    async edit(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            if (mesa) {
                return res.render("mesa/edit", {
                    layout: "layout/main",
                    title: "Edit de Mesa",
                    mesa: mesa,
                    csrfToken: req.csrfToken()
                });
            }
            SessionStatusMessageHandler.setSessionStatusMessage(req, "warning", `Mesa com id = ${req.params.mesaId} não encontrada.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/mesa");
    }

    /**
    * Regras de validação para o update.
    */
    updateValidationRules = [
        param('mesaId').isInt({ min: 1 }).withMessage('O ID do tipo de produto deve ser um número inteiro maior que 0.'),
        body('numero').isInt({ min: 0 }).withMessage('O número da mesa deve ser um número inteiro maior que -1.')
    ];

    /**
    * Atualiza um recurso existente no banco de dados
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
    */
    async update(req, res) {
        try {
            // Verificar se há erros de validação
            const validation = validationResult(req);
            if (!validation.isEmpty()) {
                throw validation;
            }
            const mesa = await MesaModel.findOne(req.params.mesaId);
            if (!mesa) {
                SessionStatusMessageHandler.setSessionStatusMessage(req, "warning", `Mesa com id = ${req.params.mesaId} não encontrada.`);
                return res.redirect("/mesa");
            }
            mesa.numero = req.body.numero;
            const result = await mesa.update();
            SessionStatusMessageHandler.setSessionStatusMessage(req, "success", `Mesa número = ${result.numero} editada com sucesso.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/mesa");
    }

    /**
    * Remove um recurso existente do banco de dados
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
    */
    async destroy(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            if (!mesa) {
                SessionStatusMessageHandler.setSessionStatusMessage(req, "warning", `Mesa com id = ${req.params.mesaId} não encontrada.`);
                return res.redirect("/mesa");
            }
            const result = await mesa.delete();
            SessionStatusMessageHandler.setSessionStatusMessage(req, "success", `Mesa número = ${result.numero} removida com sucesso.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/mesa");
    }
}
module.exports = new WebMesaController();