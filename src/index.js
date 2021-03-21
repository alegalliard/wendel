import data from '../database/data.json'
import FluentSQLBuilder from './fluentSQL.js'


const result = FluentSQLBuilder.for(data)
                    .where({ registered: /(2019|2020)/ })
                    .where({ category: /(developer|salesman|bartender)$/ })
                    .select(['_id', 'name', 'age', 'company'])
                    .orderBy('age')
                    .limit(20)
                    .build()

console.table(result)