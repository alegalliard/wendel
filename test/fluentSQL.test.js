import { expect, describe, test } from '@jest/globals';
import FluentSQLBuilder from '../src/fluentSQL';

const data = [
    {
        id: 0,
        name: 'Ale',
        category: 'developer'
    },
    {
        id: 1,
        name: 'Anderson',
        category: 'log'
    },
    {
        id: 3,
        name: 'Fernanda',
        category: 'sale'
    },
]

describe('Test Suite for FluentSQL Builder', () => {
    test('#for should return a FluentSQLBuilder instance', () => {
        const result = FluentSQLBuilder.for(data)
        const expected = new FluentSQLBuilder({ database: data })
        expect(result).toStrictEqual(expected)

    })

    test('#build should return the empty object instance', () => {
        const result = FluentSQLBuilder.for(data).build()
        const expected = data
        expect(result).toStrictEqual(expected)
    })

    test('#limit given a collection it should limit results', () => {
        const result = FluentSQLBuilder.for(data).limit(1).build()
        
        const expected = [data[0]]
        expect(result).toStrictEqual(expected)
    })


    test.only('#where given a collection it should filter data', () => {
        const result = FluentSQLBuilder.for(data)
        .where({
            category: /^dev/
        }).build()
        
        const expected = data.filter(({ category }) => category.slice(0,3) === 'dev')
        
        expect(result).toStrictEqual(expected)
    })

    // test.todo('#select given a collection it should return only specific fields', () => {
        
    // })

    // test.todo('#orderBy given a collection it should order results bu field', () => {
        
    // })

    test.todo('pipeline')
})