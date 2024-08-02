const { param, body, validationResult } = require("express-validator");
const SessionStatusMessageHandler = require("../message_handler/SessionStatusMessageHandler");
const ProdutoModel = require("../models/ProdutoModel");
const TipoProdutoModel = require("../models/TipoProdutoModel");

class WebProdutoController {
    /**
    * Mostra uma tela com todos os recursos
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    */
    async index(req, res) {
        try {
            const produtos = await ProdutoModel.findAllWithTipoProdutoDescricao();
            return res.render("produto/index", {
                layout: "layout/main",
                title: "Index de Produto",
                produtos: produtos,
                message: SessionStatusMessageHandler.getAndClearSessionStatusMessage(req),
                csrfToken: req.csrfToken()
            });
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
            return res.render("produto/index", {
                layout: "layout/main",
                title: "Index de Produto",
                produtos: [],
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
            const tipoProdutos = await TipoProdutoModel.findAll();
            return res.render("produto/create", {
                layout: "layout/main",
                title: "Create de Produto",
                tipoProdutos: tipoProdutos,
                csrfToken: req.csrfToken()
            });
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
            return res.redirect("/produto");
        }
    }

    /**
    * Regras de validação para o store.
    */
    storeValidationRules = [
        body('numero').isInt({ min: 0 }).withMessage('O número do produto deve ser um número inteiro maior que -1.'),
        body('nome').isString().not().isEmpty().withMessage('O nome do produto deve ser um texto não vazio.'),
        body('preco').isFloat({ min: 0.0 }).withMessage('O preço do produto deve ser um número maior ou igual 0.'),
        body('TipoProduto_id').isInt({ min: 1 }).withMessage('O ID do tipo de produto deve ser um número inteiro maior que 0.'),
        body('ingredientes').isString().not().isEmpty().withMessage('Os ingredientes deve ter um texto não vazio.')
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
            const produto = new ProdutoModel();
            produto.numero = req.body.numero;
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.TipoProduto_id = req.body.TipoProduto_id;
            produto.ingredientes = req.body.ingredientes;
            const result = await produto.save();
            SessionStatusMessageHandler.setSessionStatusMessage(req, "success", `Produto ${result.nome} salvo com sucesso.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/produto");
    }


    /**
    * Mostra um recurso específico
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async show(req, res) {
        try {
            const produto = await ProdutoModel.findOneWithTipoProdutoDescricao(req.params.produtoId);
            if (produto) {
                return res.render("produto/show", {
                    layout: "layout/main",
                    title: "Show de Produto",
                    produto: produto
                });
            }
            SessionStatusMessageHandler.setSessionStatusMessage(req, "warning", `Produto com id = ${req.params.produtoId} não encontrado.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/produto");
    }


    /**
    * Mostra um formulário para editar um recurso específico
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async edit(req, res) {
        try {
            const produto = await ProdutoModel.findOne(req.params.produtoId);
            const tipoProdutos = await TipoProdutoModel.findAll();
            if (produto) {
                return res.render("produto/edit", {
                    layout: "layout/main",
                    title: "Edit de Produto",
                    produto: produto,
                    tipoProdutos: tipoProdutos,
                    csrfToken: req.csrfToken()
                });
            }
            SessionStatusMessageHandler.setSessionStatusMessage(req, "warning", `Produto com id = ${req.params.produtoId} não encontrado.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/produto");
    }

    /**
    * Regras de validação para o update.
    */
    updateValidationRules = [
        param('produtoId').isInt({ min: 1 }).withMessage('O ID do produto deve ser um número inteiro maior que 0.'),
        body('numero').isInt({ min: 0 }).withMessage('O número do produto deve ser um número inteiro maior que -1.'),
        body('nome').isString().not().isEmpty().withMessage('O nome do produto deve ser um texto não vazio.'),
        body('preco').isFloat({ min: 0.0 }).withMessage('O preço do produto deve ser um número maior ou igual 0.'),
        body('TipoProduto_id').isInt({ min: 1 }).withMessage('O ID do tipo de produto deve ser um número inteiro maior que 0.'),
        body('ingredientes').isString().not().isEmpty().withMessage('Os ingredientes deve ter um texto não vazio.')
    ];

    /**
    * Atualiza um recurso existente no banco de dados
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async update(req, res) {
        try {
            // Verificar se há erros de validação
            const validation = validationResult(req);
            if (!validation.isEmpty()) {
                throw validation;
            }
            const produto = await ProdutoModel.findOne(req.params.produtoId);
            if (!produto) {
                SessionStatusMessageHandler.setSessionStatusMessage(req, "warning", `Produto com id = ${req.params.produtoId} não encontrado.`);
                return res.redirect("/produto");
            }
            produto.numero = req.body.numero;
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.TipoProduto_id = req.body.TipoProduto_id;
            produto.ingredientes = req.body.ingredientes;
            const result = await produto.update();
            SessionStatusMessageHandler.setSessionStatusMessage(req, "success", `Produto ${result.nome} editado com sucesso.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/produto");
    }


    /**
    * Remove um recurso existente do banco de dados
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {express.Response} res O objeto de resposta do Express.
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async destroy(req, res) {
        try {
            const produto = await ProdutoModel.findOne(req.params.produtoId);
            if (!produto) {
                SessionStatusMessageHandler.setSessionStatusMessage(req, "warning", `Produto com id = ${req.params.produtoId} não encontrado.`);
                return res.redirect("/produto");
            }
            const result = await produto.delete();
            SessionStatusMessageHandler.setSessionStatusMessage(req, "success", `Produto ${result.nome} removido com sucesso.`);
        } catch (error) {
            SessionStatusMessageHandler.setSessionStatusMessage(req, "danger", error);
        }
        return res.redirect("/produto");
    }

}

module.exports = new WebProdutoController();