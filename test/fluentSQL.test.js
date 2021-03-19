import { expect, describe, test } from '@jest/globals';
import FluentSQLBuilder from '../src/fluentSQL';

const data = [
    {
        id: 0,
        name: 'Ale',
        category: 'dev'
    },
    {
        id: 1,
        name: 'Anderson',
        category: 'log'
    },
    {
        id: 2,
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

    // test.todo('#build should return the empty object instance', () => {
        
    // })

    // test.todo('#limit given a collection it should limit results', () => {
        
    // })
    // test.todo('#where given a collection it should filter data', () => {
        
    // })

    // test.todo('#select given a collection it should return only specific fields', () => {
        
    // })

    // test.todo('#orderBy given a collection it should order results bu field', () => {
        
    // })

    test.todo('pipeline')
})