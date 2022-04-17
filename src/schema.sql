drop table if exists enderecos;

create table enderecos (
	id serial primary key,
  	cep text not null,
	logradouro text not null,
    complemento text not null,
    bairro text not null,
    cidade text not null,
    estado text not null
);
