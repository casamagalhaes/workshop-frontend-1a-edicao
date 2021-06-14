exports.up = function (knex) {
  return knex.schema.createTable("funcionario", (tb) => {
    tb.increments("id").notNullable();
    tb.string("nome").notNullable();
    tb.string("usuario").notNullable();
    tb.boolean("admin").notNullable().defaultTo(false);
    tb.string("cargo");
    tb.string("setor");
    tb.string("email");
    tb.string("telefone");
    tb.string("endereco_logradouro");
    tb.string("endereco_bairro");
    tb.string("endereco_cep");
    tb.string("endereco_numero");
    tb.string("saldo_horas").notNullable().defaultTo("0");
    tb.string("criado_em").defaultTo(new Date().toISOString());
    tb.string("atualizado_em").defaultTo(new Date().toISOString());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("funcionario");
};
