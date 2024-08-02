/**
* Classe para manipulação de mensagens de status da sessão.
*/
class SessionStatusMessageHandler {

    /**
    * Obtém a mensagem de status da sessão.
    * @param {express.Request} req O objeto de requisição do Express.
    * @returns {Array|null} A mensagem de status da sessão, ou null se não houver mensagem.
    */
    static getSessionStatusMessage(req) {
        return req.session.statusMessage;
    }

    /**
    * Limpa a mensagem de status da sessão.
    * @param {express.Request} req O objeto de requisição do Express.
    */
    static clearSessionStatusMessage(req) {
        delete req.session.statusMessage;
    }

    /**
    * Obtém e limpa a mensagem de status da sessão.
    * @param {express.Request} req O objeto de requisição do Express.
    * @returns {Array|null} A mensagem de status da sessão, ou null se não houver mensagem.
    */
    static getAndClearSessionStatusMessage(req) {
        const statusMessage = req.session.statusMessage ? req.session.statusMessage : null;
        delete req.session.statusMessage;
        return statusMessage;
    }

    /**
    * Define uma mensagem de status da sessão.
    * @param {express.Request} req O objeto de requisição do Express.
    * @param {string} type O tipo da mensagem (por exemplo, "success", "warning" ou "danger").
    * @param {Error} error O erro para ser convertido em mensagem.
    */
    static setSessionStatusMessage(req, type, error) {
        req.session.statusMessage = [type, this.#errorToLocalizedString(error)];
    }

    /**
    * Converte um erro em uma string localizada.
    * @param {Error} error O erro a ser convertido.
    * @returns {string} A representação localizada do erro.
    * @private
    */
    static #errorToLocalizedString(error) {
        switch (typeof error) {
            case 'string':
                return error;
            case 'object':
                if ('message' in error && 'errno' in error && 'sql' in error && 'sqlState' in error && 'sqlMessage' in error) { // erro MariaDB
                    if (error.errno == 1451) return "Não é possível excluir ou modificar este registro, pois há registros relacionados em outra parte do sistema.";
                }
                if ('message' in error && 'code' in error && 'errno' in error) { // Erro do pacote mysql2
                    if (error.errno == -4078) return "Não foi possível conectar ao banco de dados. Por favor, verifique sua conexão com a internet ou o servidor pode estar offline.";
                }
                if ('errors' in error) { // Erro do express validator
                    let msg = "";
                    error.errors.forEach(element => {
                        msg += `<div>${element.msg}</div>`;
                    });
                    return msg;
                }
                return JSON.stringify(error);
            default:
                return JSON.stringify(error);
        }
    }
}

module.exports = SessionStatusMessageHandler;