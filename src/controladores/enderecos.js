const knex = require('../conexao.js');
const schemaCadastroCep = require('../validacoes/schemaCadastroCep');
const axios = require('axios');

const cadastrarCep = async (req, res) => {
  let {
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado
  } = req.body;

  try {
    await schemaCadastroCep.validate(req.body);

    const ConsultaCep = await knex.select().from('enderecos').where({ cep }).first();

    if (!ConsultaCep) {
      try {
        const cepNovo = await knex('enderecos')
          .insert({
            cep,
            logradouro,
            complemento,
            bairro,
            cidade,
            estado
          });

        if (!cepNovo) {
          return res.status(500).json({
            mensagem: "Não foi possível cadastrar o Cep",
            sucesso: false
          });
        }

        return res.status(200).json({
          mensagem: 'Cep cadastrado com sucesso.',
          sucesso: true
        });
      } catch (error) {

      }
    }

  } catch (error) {
    return res.status(500).json({
      mensagem: `Erro - ${error.message}.`,
      sucesso: false
    });
  }
}

const buscarCep = async (req, res) => {

  let { cep } = req.params;

  try {

    const ConsultaCep = await knex.select().from('enderecos').where({ cep }).first();

    if (!ConsultaCep) {
      try {

        const result = await axios.get(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`)

        return res.status(200).json(result.data)

      } catch (error) {
      }
    }
    return res.status(200).json(ConsultaCep)

  } catch (error) {
    return res.status(500).json({
      mensagem: `Erro - ${error.message}.`,
      sucesso: false
    });
  }

}

module.exports = {
  cadastrarCep,
  buscarCep
};