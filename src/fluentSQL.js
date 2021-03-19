export default class FluentSQLBuilder {
    //privado
    #database = []

    // Não chama ele direto, usa o for abaixo instead
    constructor({ database }) {
        this.#database = database;
    }

    /* pra retornar a instância do objeto, pra não chamar 
    direto do construtor
    */
    static for(database) {
        return new FluentSQLBuilder({ database })
    }

    // factory, quem realmente retorna a instância do objetos
    build() {
        const results = []

        return results
    }
}