# Assembleo Core MS

Clean Architecture + DDD microsserviço usando Hono, Prisma e Cloudflare Workers.

## Instalação

```bash
npm install
```

## Scripts Disponíveis

- `npm run dev` - Desenvolvimento local
- `npm run deploy` - Deploy para produção
- `npm run migrate` - Rodar migrações do banco
- `npm run generate` - Gerar cliente Prisma
- `npm run studio` - Abrir Prisma Studio
- `npm run plop` - Gerar código usando templates
- `npm run cf-typegen` - Gerar types do Cloudflare

## Geradores de Código (Plop)

### Gerar um novo módulo

```bash
npm run plop
# Selecione "module" e siga as instruções
```

Isso criará a estrutura completa:
- `src/modules/{module-name}/{module}.module.ts`
- Repositories (interface + implementação)
- Services (opcional)
- Estrutura para use-cases

### Gerar um novo use-case

```bash
npm run plop
# Selecione "use-case" e siga as instruções
```

Isso criará:
- Use-case class
- Controller (opcional)
- DTO (opcional)
- Factory
- Testes

## Estrutura do Projeto

```
src/
├── @shared/              # Utilitários compartilhados
├── entities/            # Entidades de domínio
├── errors/              # Sistema de erros tipados
├── middlewares/         # Middlewares da aplicação
├── modules/             # Módulos organizados por domínio
│   └── {module-name}/
│       ├── {module}.module.ts
│       ├── use-cases/
│       ├── repositories/
│       └── services/
├── repositories/        # Repositories globais
├── services/           # Serviços globais
└── types/              # Types globais
```

Para mais detalhes sobre a arquitetura, veja [ARCHITECTURE.md](./ARCHITECTURE.md).
