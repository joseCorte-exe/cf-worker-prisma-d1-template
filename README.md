# Template: Cloudflare Worker com Prisma e D1

Um template inicial para construir aplicações serverless na plataforma da Cloudflare utilizando Workers, o ORM Prisma e o banco de dados D1.

Este projeto vem pré-configurado com [Hono](https://hono.dev/) para roteamento, e scripts para facilitar o desenvolvimento e o deploy.

## ✨ Features

-   **Cloudflare Workers**: Execute seu código na edge, perto dos seus usuários.
-   **Prisma ORM**: ORM moderno e type-safe para interagir com seu banco de dados.
-   **Cloudflare D1**: Banco de dados SQL nativo da Cloudflare.
-   **Hono**: Framework web pequeno, simples e ultrarrápido para a edge.
-   **TypeScript**: Totalmente configurado para um desenvolvimento robusto.
-   **Wrangler CLI**: Ferramenta de linha de comando para gerenciar seus projetos Cloudflare.

---

## 🚀 Começando

Siga os passos abaixo para configurar e executar o projeto localmente.

### 1. Clone o Repositório

```bash
# Clone o projeto para sua máquina local
git clone https://github.com/seu-usuario/cf-worker-prisma-d1-template.git

# Navegue até o diretório
cd cf-worker-prisma-d1-template
```

### 2. Instale as Dependências

Este projeto utiliza `npm` para gerenciamento de pacotes.

```bash
npm install
```

### 3. Crie seu Banco de Dados D1

Você precisará do [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) logado em sua conta Cloudflare.

```bash
# Crie um novo banco de dados D1 (substitua <NOME_DO_BANCO> por um nome de sua escolha)
wrangler d1 create <NOME_DO_BANCO>
```

O comando acima irá retornar o `binding`, `database_name` e `database_id`.

### 4. Configure o `wrangler.jsonc`

Abra o arquivo `wrangler.jsonc` e atualize a seção `d1_databases` com as informações do passo anterior. O `binding` já está como `"DB"`, então você só precisa atualizar o nome e o ID.

```jsonc
// wrangler.jsonc

"d1_databases": [
  {
    "binding": "DB",
    "database_name": "seu-nome-de-banco-aqui",
    "database_id": "seu-id-de-banco-aqui"
  }
]
```

### 5. Crie o arquivo `.dev.vars`

Para o Prisma conseguir acessar o banco de dados localmente, crie um arquivo `.dev.vars` na raiz do projeto. O Wrangler irá carregá-lo automaticamente.

```
# .dev.vars
DB=D1_DATABASE
```

### 6. Aplique o Schema do Banco de Dados

Execute a migração inicial para criar as tabelas no seu banco de dados D1.

```bash
npm run migrate
```

Isso aplicará o schema definido em `prisma/schema.prisma`.

---

## 💻 Desenvolvimento Local

Para iniciar o servidor de desenvolvimento local, execute:

```bash
npm run dev
```

O Wrangler irá iniciar um servidor local (geralmente em `http://localhost:8787`) e aplicará as alterações do seu código em tempo real.

## 🛠️ Scripts Disponíveis

-   `npm run dev`: Inicia o ambiente de desenvolvimento local.
-   `npm run deploy`: Faz o deploy da sua aplicação para a Cloudflare.
-   `npm run migrate`: Executa as migrações do Prisma (`prisma migrate dev`).
-   `npm run generate`: Gera o cliente Prisma sem a engine binária (`--no-engine`).
-   `npm run studio`: Inicia o Prisma Studio para visualizar e editar seus dados.
-   `npm run cf-typegen`: Gera os tipos para os bindings da Cloudflare.

---

## ☁️ Deploy

Para fazer o deploy da sua aplicação para a rede global da Cloudflare, execute o comando:

```bash
npm run deploy
```

O comando irá minificar o código e publicá-lo.