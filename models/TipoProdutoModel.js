const DataBase = require("../config/Database")

class TipoProdutoModel {
    /**
     * Os atributos da classe Model precisam ser correspondentes às colunas do banco de dados.
     */
    id = null;
    descricao = null;
    dataAtualizacao = null;
    dataCriacao = null;

    /**
     * Construtor de Classe TipoProdutoModel
     * @param {TipoProduto} tipoProduto O objeto de entrada é simples (precisa conter apenas chave e valor, sem métodos)
     */
    constructor(tipoProduto){
        if (tipoProduto &&
            "id" in tipoProduto &&
            "descricao" in tipoProduto &&
            "dataAtualizacao" in tipoProduto &&
            "dataCriacao" in tipoProduto
        ) {
            this.id = tipoProduto.id;
            this.descricao = tipoProduto.descricao;
            this.dataAtualizacao = tipoProduto.dataAtualizacao;
            this.dataCriacao = tipoProduto.dataCriacao;
        }
    }
}