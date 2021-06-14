import { knex } from "../config/db";
import { CustomError } from "../controller/util";

const verifica404 = (res, id) => {
  if (res === 0)
    throw new CustomError({
      status: 404,
      message: `Recurso com id ${id} não encontrado`,
    });
};

export const list = async (query) => {
  const { start = 0, limit = 10, sort = {}, nome = "", ...q } = query;
  const s = JSON.parse(sort);

  q.admin = !!q.admin;

  let items = await knex("funcionario")
    .where("nome", "like", `%${nome}%`)
    .andWhere(q)
    .offset(start)
    .limit(limit)
    .orderBy(s.prop, s.direction);
  let [total] = await knex("funcionario")
    .where("nome", "like", `%${nome}%`)
    .andWhere(q)
    .count("id");

  items = items.map((item) => ({
    ...item,
    admin: new Boolean(item.admin),
  }));

  total = total[Object.keys(total)[0]];
  return { start, limit, items, total };
};

export const find = async (id) => {
  const [funcionario] = await knex("funcionario").where({ id });
  if (!funcionario)
    throw new CustomError({
      status: 404,
      message: `Recurso com id ${id} não encontrado`,
    });

  funcionario.admin = new Boolean(funcionario.admin);
  return funcionario;
};

export const insert = async (funcionario) => {
  funcionario.criado_em = new Date().toISOString();
  funcionario.atualizado_em = new Date().toISOString();

  return knex("funcionario").insert(funcionario);
};

export const partialUpdate = async (funcionario, id) => {
  if (!id || id === "null")
    throw new CustomError({
      status: 405,
      message: "O id do recurso deve ser informado na URL",
    });

  funcionario.id = id;
  const keys = Object.keys(funcionario);
  const values = Object.values(funcionario);

  keys.forEach(async (key, index) => {
    await knex("funcionario")
      .where({ id })
      .update({ [key]: values[index] });
  });

  const res = knex("funcionario")
    .where({ id })
    .update({ atualizado_em: new Date().toISOString() });

  verifica404(res, id);

  return res;
};

export const update = async (funcionario, id) => {
  if (!id || id === "null")
    throw new CustomError({
      status: 405,
      message: "O id do recurso deve ser informado na URL",
    });

  funcionario.id = id;
  funcionario.atualizado_em = new Date().toISOString();

  const res = await knex("funcionario").where({ id }).update(funcionario);
  verifica404(res, id);

  return res;
};

export const del = async (id) => {
  if (!id || id === "null")
    throw new CustomError({
      status: 405,
      message: "O id do recurso deve ser informado na URL",
    });

  const res = await knex("funcionario").where({ id }).del();
  verifica404(res, id);

  return res;
};
