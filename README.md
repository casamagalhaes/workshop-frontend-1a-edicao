# worker-control

O worker-control é uma aplicação simples para registrar funcionários de um estabelecimento.

## Pré-requisitos

- Última versão LTS do [Node](https://nodejs.org/en/)
- `.npmrc` contendo token de acesso à Shuri (solicitar à equipe de desenvolvimento)

É interessante ter a extensão `Vue.js devtools` instalada no navegador (Chrome).

## Estrutura e tecnologias do projeto

**Banco**: SQLite

**Backend**: em `Node` com recursos do `express` e `knex`.

**Frontend**: em `Vue.js` com `SCSS`.

Nesse monorepo, há duas pastas indicando a parte de serviço e o webapp do projeto, respectivamente, `worker-control-service` e `worker-control-webapp`.

O frontend deverá ser desenvolvido inteiramente na pasta `worker-control-webapp`.

## O que fazer

Através de telas simples, deve ser consumido o CRUD de funcionários. As rotas da API disponíveis são:

`/status` - verifição de status
`/funcionarios` - CRUD de funcionários

Os campos obrigatórios em um funcionário são: `id`, `nome`, `usuario`, `saldo_horas` e `admin`.

A **documentação da API** está disponível em: https://documenter.getpostman.com/view/8141090/TzXunKQt, mas também há uma pequena documentação no README da pasta de serviço.

Se esperam duas telas:

- Tela de listagem:
  - **Filtrar** resultados por nome e id.
  - Obter resultados **paginados**.
  - Mudar o tamanho das páginas.
  - **Ordenar** os resultados.
  - Deve ser possível alterar o valor das horas extras apenas clicando no valor na tabela e inserindo novo valor.
- Tela de cadastro:
  - Deve identificar quando é cadastro ou edição para que tenha o comportamento correto.
  - Deve permitir **criar** um novo funcionário quando for o caso.
  - Deve **exibir** todos os dados já existentes do funcionário em caso de **edição**, montando a tela com os **campos editáveis preenchidos**.
  - Deve permitir **atualizar** um funcionário quando for o caso.

## Como começar

Para inicializar o projeto, devemos rodar o comando:

```
echo 'SEU_TOKEN_AQUI' >> ./worker-control-webapp/.npmrc
```

Isso irá adicionar o token no `.npmrc` do projeto frontend e, consequentemente, dando acesso à biblioteca da Shuri.

Após isso, rode o comando:

```
yarn initialize
```

O `initialize` irá **instalar** as **dependências** de backend e frontend, apagando o token do `.npmrc` logo em seguida.

Para rodar o backend ou frontend, basta executar o comando:

```
// back
yarn dev:back

// front
yarn dev:front
```

O backend irá subir na porta 3000 com todas as migrações executadas e já teremos uma **aplicação** frontend funcional **disponível** na porta 8080: `http://localhost:8080`.

Para **resetar** os dados do **banco**, basta rodar:

```
yarn migrate:down
yarn migrate:latest
```

### Testes

Podemos rodar testes com os comandos:

```
// back
yarn test:back

// front
yarn test:front

```

Caso encontre algum erro no projeto que não tenha relação com a sua implementação, favor consultar os condutores do hackathon.
