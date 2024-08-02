const { param, body, validationResult } = require("express-validator");
const SessionStatusMessageHandler = require("../message_handler/SessionStatusMessageHandler");
const TipoProdutoModel = require("../models/TipoProdutoModel");

class WebTipoProdutoController {

    /**
    * Mostra uma tela com todos os recursos
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    */
    async index(req, res) {
        try {
            const tipoProdutos = await TipoProdutoModel.findAll();
            return res.render("tipoproduto/index", {
                layout: "layout/main",
                title: "Index de TipoProduto",
                tipoProdutos: tipoProdutos,
                message: SessionStatusMessageHandler.getAndClearSessionStatusMessage(req),
                csrfToken: req.csrfToken()
            });
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
            return res.render("tipoproduto/index", {
                layout: "layout/main",
                title: "Index de TipoProduto",
                tipoProdutos: [],
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
            return res.render("tipoproduto/create", {
                layout: "layout/main",
                title: "Create de TipoProduto",
                csrfToken: req.csrfToken()
            });
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
            return res.redirect("/tipoproduto");
        }
    }

    /**
    * Regras de validação para o store.
    */
    storeValidationRules = [
        body('descricao').isString().not().isEmpty().withMessage('A descricao do tipo de produto deve ser um texto não vazio.')
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
            const tipoProduto = new TipoProdutoModel();
            tipoProduto.descricao = req.body.descricao;
            const result = await tipoProduto.save();
            SessionStatusMessageHandler.setSessionStatusMessage(req, "success", `Tipo de produto ${result.descricao} salvo com sucesso.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/tipoproduto");
    }

    /**
    * Mostra um recurso específico
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
    */
    async show(req, res) {
        try {
            const tipoProduto = await TipoProdutoModel.findOne(req.params.tipoProdutoId);
            if (tipoProduto) {
                return res.render("tipoproduto/show", {
                    layout: "layout/main",
                    title: "Show de TipoProduto",
                    tipoProduto: tipoProduto
                });
            }
            SessionStatusMessageHandler.setSessionStatusMessage(req, "warning", `Tipo produto com id = ${req.params.tipoProdutoId} não encontrado.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/tipoproduto");
    }

    /**
    * Mostra um formulário para editar um recurso específico
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
    */
    async edit(req, res) {
        try {
            const tipoProduto = await TipoProdutoModel.findOne(req.params.tipoProdutoId);
            if (tipoProduto) {
                return res.render("tipoproduto/edit", {
                    layout: "layout/main",
                    title: "Edit de TipoProduto",
                    tipoProduto: tipoProduto,
                    csrfToken: req.csrfToken()
                });
            }
            SessionStatusMessageHandler.setSessionStatusMessage(req, "warning", `Tipo produto com id = ${req.params.tipoProdutoId} não encontrado.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/tipoproduto");
    }

    /**
    * Regras de validação para o update.
    */
    updateValidationRules = [
        param('tipoProdutoId').isInt({ min: 1 }).withMessage('O ID do tipo de produto deve ser um número inteiro maior que 0.'),
        body('descricao').isString().not().isEmpty().withMessage('A descrição do tipo de produto deve ser um texto não vazio.')
    ];

    /**
    * Atualiza um recurso existente no banco de dados
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
    */
    async update(req, res) {
        try {
            // Verificar se há erros de validação
            const validation = validationResult(req);
            if (!validation.isEmpty()) {
                throw validation;
            }
            const tipoProduto = await TipoProdutoModel.findOne(req.params.tipoProdutoId);
            if (!tipoProduto) {
                SessionStatusMessageHandler.setSessionStatusMessage(req, "warning", `Tipo produto com id = ${req.params.tipoProdutoId} não encontrado.`);
                return res.redirect("/tipoproduto");
            }
            tipoProduto.descricao = req.body.descricao;
            const result = await tipoProduto.update();
            SessionStatusMessageHandler.setSessionStatusMessage(req, "success", `Tipo de produto ${result.descricao} editado com sucesso.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/tipoproduto");
    }

    /**
    * Remove um recurso existente do banco de dados
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
    */
    async destroy(req, res) {
        try {
            const tipoProduto = await TipoProdutoModel.findOne(req.params.tipoProdutoId);
            if (!tipoProduto) {
                SessionStatusMessageHandler.setSessionStatusMessage(req, "warning", `Tipo produto id = ${req.params.tipoProdutoId} não encontrado.`);
                return res.redirect("/tipoproduto");
            }
            const result = await tipoProduto.delete();
            SessionStatusMessageHandler.setSessionStatusMessage(req, "success", `Tipo de produto ${result.descricao} removido com sucesso.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/tipoproduto");
    }

}

module.exports = new WebTipoProdutoController();