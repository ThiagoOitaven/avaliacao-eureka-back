const express = require('express');
const enderecos = require('./controladores/enderecos.js');

const rotas = express();

rotas.post('/', enderecos.cadastrarCep);
rotas.get('/:cep', enderecos.buscarCep)

module.exports = rotas