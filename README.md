# Wendel

Projetinho maroto em Node 15 para estudar Jest com testes e tal.

(Funciona também no 14.3)


### Anotações durante a criação do projeto

Para iniciar o jest, rode

```sh

$ npm jest --init

```

O Typemodule é para usar o import e export nativos do JS.

No package.json, adicionar o npx no test para garantir que o Jest utilizado será o do projeto corrente


```json
"scripts": {
    "test": "NODE_OPTIONS=--experimental-vm-modules npx jest --config jest.config.mjs",
    "test:cov": "NODE_OPTIONS=--experimental-vm-modules npx jest --config jest.config.mjs --coverage",
    "test:watch": "NODE_OPTIONS=--experimental-vm-modules npx jest --config jest.config.mjs --watchAll"
  },
```

NODE_OPTIONS=--experimental-vm-modules : para trabalhar com ECMAScript modules
--coverage: o quão testado está o código. Rodar esse código vai gerar um relatório em HTML dentro da pasta coverage/
--watchAll: toda vez que alterar o código, restarta o projeto


Funções privadas são testadas via métodos públicos