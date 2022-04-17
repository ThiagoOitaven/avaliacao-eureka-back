const yup = require('./configuracoes')

const schemaCadastroCep = yup.object().shape({
  cep: yup.string().required(),
  logradouro: yup.string().required(),
  complemento: yup.string().nullable(),
  bairro: yup.string().required(),
  cidade: yup.string().required(),
  estado: yup.string().required().max(2)
})

module.exports = schemaCadastroCep