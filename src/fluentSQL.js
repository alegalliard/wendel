// Padrão builder para construir o projeto sob demanda

export default class FluentSQLBuilder {
    //privado
    #database = []
    #limit = 0
    #select = []
    #where = []
    #orderBy = ''

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

    limit(max) {
        this.#limit = max
        // retornando o contexto pro build poder fazer o processamento
        return this
    }

    select(props) {
        this.#select = props
        return this
    }

    where(query) {
        const [[prop, selectedValue]] = Object.entries(query)
        const whereFilter = selectedValue instanceof RegExp ?
                selectedValue : 
                new RegExp(selectedValue)

        this.#where.push({ prop, filter: whereFilter })

        return this
    }

    orderBy(field) {
        this.#orderBy = field
        return this
    }

    //privado
    #performLimit(results) {
        return this.#limit && results.length === this.#limit
    }

    #performWhere(item) {
        for( const { filter, prop } of this.#where) {
            if(!filter.test(item[prop])) return false
        }

        return true
    }

    #performSelect(item) {
        const currentItem = {}
        const entries = Object.entries(item)
        for(const [key, value] of entries) {
            if(this.#select.length && !this.#select.includes(key)) continue

            currentItem[key] = value
        }

        return currentItem
    }

    #performOrderBy(results) {
        if(!this.#orderBy) return results

        return results.sort((prev, next) => {
            if(!prev[this.#orderBy]) 
                return prev
            
            return prev[this.#orderBy].toString()
                        .localeCompare(next[this.#orderBy].toString())
        } )
    }

    // factory, quem realmente retorna a instância do objetos
    build() {
        const results = []

        for(const item of this.#database) {
            if(!this.#performWhere(item)) continue;

            const currentItem = this.#performSelect(item)
            results.push(currentItem)

            if(this.#performLimit(results)) break;

        }

        const finalResult = this.#performOrderBy(results)

        return finalResult
    }
}