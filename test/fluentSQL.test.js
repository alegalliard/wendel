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
        name: 'Fernanda',
        category: 'log'
    },
    {
        id: 3,
        name: 'Anderson',
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


    test('#where given a collection it should filter data', () => {
        const result = FluentSQLBuilder.for(data)
        .where({
            category: /^dev/
        }).build()
        
        const expected = data.filter(({ category }) => category.slice(0,3) === 'dev')
        
        expect(result).toStrictEqual(expected)
    })

    test('#select given a collection it should return only specific fields', () => {
        const result = FluentSQLBuilder.for(data)
                        .select(['name', 'category'])
                        .build()

        const expected = data.map(({name, category}) => ({name, category}))

        expect(result).toStrictEqual(expected)
    })

    test('#orderBy given a collection it should order results by field', () => {
        const result = FluentSQLBuilder.for(data)
                        .orderBy('name')
                        .build()

        const expected = [
            {
                id: 0,
                name: 'Ale',
                category: 'developer'
            },
            {
                id: 3,
                name: 'Anderson',
                category: 'sale'
            },
            {
                id: 1,
                name: 'Fernanda',
                category: 'log'
            },
        ]

        expect(result).toStrictEqual(expected)
    })

    test.todo('pipeline')
})