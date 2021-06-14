# worker-control-service

Endpoints REST disponibilizados para dar suporte ao desenvolvimento do frontend.

## Endpoints disponíveis em modo de desenvolvimento

- <http://localhost:3000>
  - `/funcionarios`
    - **GET**: lista as os funcionários.
    - **POST**: cria um funcionário.
    - **PUT**: atualiza um funcionário inteiramente.
    - **PATCH**: atualiza parcialmente um funcionário.
    - **DELETE**: remove um funcionário.

## Parâmetros no GET

No endpoint `funcionarios` podemos buscar por:

| Propriedade         | Tipo    |
| ------------------- | ------- |
| id                  | Number  |
| admin               | Boolean |
| email               | String  |
| nome                | String  |
| nome_usuario        | String  |
| saldo_horas         | Number  |
| setor               | String  |
| cargo               | String  |
| endereco_cep        | String  |
| endereco_logradouro | String  |
| endereco_bairro     | String  |
| endereco_numero     | String  |

É recomendado que se faça a filtragem de funcionários através de requisição parametrizada.

A paginação também é suportada por parâmetro, podendo passar um `start` e um `limit`.

## Formato do payload

- **funcionario**:

```js
{
  admin: false;
  atualizado_em: "2021-05-24T19:58:11.770Z";
  cargo: "Desenvolvedor";
  criado_em: "2021-05-24T19:58:11.770Z";
  email: "ricardo@email.com";
  endereco_bairro: "Luciano Cavalcante";
  endereco_cep: "60811110";
  endereco_logradouro: "Rua Luiza Miranda Coelho";
  endereco_numero: "800";
  id: 10;
  nome: "Ricardo";
  nome_usuario: "ricardo";
  saldo_horas: null;
  setor: "Desenvolvimento";
  telefone: "(65) 98976-7989";
}
```
