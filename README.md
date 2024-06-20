# Project Verena Weikert

## Descrição

**Project Verena Weikert** é uma aplicação CRUD para gerenciamento de usuários, desenvolvida com Node.js, TypeScript, Express e Prisma.

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/usuario/project-verena-weikert.git
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd project-verena-weikert
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

## Configuração do Ambiente

1. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
   ```env
   DATABASE_URL="mysql://usuario:senha@endereco-do-servidor:porta/nome-do-banco"
   PORT=8081
   ```

## Scripts Disponíveis

No arquivo `package.json`, os seguintes scripts estão disponíveis:

- **`start`**: Inicia a aplicação utilizando `ts-node`.
  ```sh
  npm start
  ```
- **`lint`**: Executa o ESLint para análise estática do código.
  ```sh
  npm run lint
  ```
- **`dev`**: Inicia a aplicação em modo de desenvolvimento com `nodemon`.
  ```sh
  npm run dev
  ```
- **`build`**: Compila o projeto TypeScript para JavaScript.
  ```sh
  npm run build
  ```
- **`test`**: Executa os testes utilizando Jest.
  ```sh
  npm test
  ```
- **`test:watch`**: Executa os testes em modo de observação.
  ```sh
  npm run test:watch
  ```
- **`migrate`**: Executa as migrações do banco de dados utilizando Prisma.
  ```sh
  npm run migrate
  ```
- **`generate`**: Gera os artefatos do Prisma.
  ```sh
  npm run generate
  ```

## Estrutura do Projeto

```plaintext
project-verena-weikert/

├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│
├── src/
│   ├── controllers/
│   ├── interfaces/
│   ├── repositories/
│   ├── services/
│   ├── index.ts
│   ├── routes.ts
│   ├── swagger.yaml
│   ├── swaggerConfig.ts
│
├── tests/
│
├── .env
├── package.json
├── tsconfig.json
└── README.md

```
