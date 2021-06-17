import chai from "chai";
import { knex } from "../app/config/db";

import * as service from "../app/service/funcionarioService";

describe("serviço de usuário", () => {
  before(async () => await knex.migrate.latest());
  after(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
  });

  it("SHOULD list workers", (done) => {
    service
      .list({})
      .then((ret) => {
        // console.log(ret);
        chai.expect(ret).to.be.an("object");
        done();
      })
      .catch(done);
  });

  it("SHOULD find worker 10", (done) => {
    service
      .find(10)
      .then((ret) => {
        // console.log(ret);
        chai.expect(ret.nome).to.equal("Ricardo");
        done();
      })
      .catch(done);
  });

  it("should list workers whose name contains word 'cardo' ", (done) => {
    service
      .list({ nome: "cardo" })
      .then((ret) => {
        // console.log(ret);
        chai.expect(ret.total).to.be.equal(1);
        done();
      })
      .catch(done);
  });

  it("should list workers using 5 as page size", (done) => {
    service
      .list({ limit: 5 })
      .then((ret) => {
        // console.log(ret);
        chai.expect(ret.items.length).to.be.equal(5);
        done();
      })
      .catch(done);
  });

  it("should list workers using 10 as start", (done) => {
    service
      .list({ start: 10 })
      .then((ret) => {
        // console.log(ret);
        chai.expect(ret.items.length).to.be.equal(2);
        done();
      })
      .catch(done);
  });

  it("should insert a new worker", (done) => {
    service
      .insert({
        nome: "Victor",
        usuario: "victor",
        admin: false,
        cargo: "Desenvolvedor",
        setor: "Desenvolvimento",
        email: "victor@email.com",
        telefone: "(32) 92379-1475",
        endereco_logradouro: "Rua Luiza Miranda Coelho",
        endereco_bairro: "Luciano Cavalcante",
        endereco_cep: "60811110",
        endereco_numero: "800",
        saldo_horas: "0",
      })
      .then((ret) => {
        // console.log(ret);
        chai.expect(ret).to.be.an("array"); // ids created
        done();
      })
      .catch(done);
  });

  it("should update an worker", (done) => {
    service
      .update(
        {
          nome: "Victor",
          usuario: "victor",
          admin: false,
          cargo: "Desenvolvedor",
          setor: "Desenvolvimento",
          email: "victor@email.com",
          telefone: "(32) 92379-1475",
          endereco_logradouro: "Rua Luiza Miranda Coelho",
          endereco_bairro: "Luciano Cavalcante",
          endereco_cep: "60811110",
          endereco_numero: "800",
          saldo_horas: "0",
        },
        1
      )
      .then((ret) => {
        // console.log(ret);
        chai.expect(ret).to.be.a("number"); // rows affected
        done();
      })
      .catch(done);
  });

  it("should delete a worker", (done) => {
    service
      .del(10)
      .then((ret) => {
        // console.log(ret);
        chai.expect(ret).to.be.a("number"); // rows affected
        done();
      })
      .catch(done);
  });
});
