const TipoProdutoModel = require("../models/TipoProdutoModel");

class WebTipoProdutoController {

    /**
    * Mostra uma tela com todos os recursos
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async index(req, res) {
        const tipoProdutos = await TipoProdutoModel.findAll();
        res.render("tipoproduto/index", { layout: "layout/main", title: "Index de TipoProduto", tipoProdutos: tipoProdutos });
    }

    /**
    * Mostra um formulário para criação de um novo recurso
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async create(req, res) {
        res.render("tipoproduto/create", { layout: "layout/main", title: "Create de TipoProduto" });
    }

    /**
    * Salva um novo recurso no banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async store(req, res) {
        const tipoProduto = new TipoProdutoModel();
        tipoProduto.descricao = req.body.descricao;
        const result = await tipoProduto.save();
        res.redirect("/tipoproduto");
    }

    /**
    * Mostra um recurso específico
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
    */
    async show(req, res) {
        try {
            const tipoProduto = await TipoProdutoModel.findOne(req.params.tipoProdutoId);
            res.send(tipoProduto);
        } catch (error) {
            
        }
    }

    /**
    * Mostra um formulário para editar um recurso específico
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
    */
    async edit(req, res) {
    }

    /**
    * Atualiza um recurso existente no banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
    */
    async update(req, res) {
    }

    /**
    * Remove um recurso existente do banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
    */
    async destroy(req, res) {
    }

}

module.exports = new WebTipoProdutoController();