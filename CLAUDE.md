# Arquitetura dos Projetos - Summary para IA

## Análise Arquitetural Completa

### 1. Pre-Flight Orchestrator MS
**Localização:** `/home/jose-corte/www/projects/pre-flight-project/pre-flight-orchestrator-ms`

#### Estrutura de Diretórios Analisada:
```
src/
├── repositories/
├── use-cases/
│   ├── create-workflow/
│   └── dtos/
```

**Contexto de Uso:** Projeto de orquestração de workflows pré-voo. Os diretórios identificados sugerem uma arquitetura limpa com separação clara entre:
- **Repositories**: Camada de acesso a dados
- **Use Cases**: Lógica de negócio específica
- **DTOs**: Objetos de transferência de dados

### 2. Associate MS
**Localização:** `/home/jose-corte/www/backend/assembleo-backend/associate-ms`

#### Estrutura Completa Analisada:
```
associate-ms/
├── @shared/
│   ├── entity.abstract.ts
│   └── validator.interface.ts
├── core/
│   ├── database/
│   │   ├── d1.ts
│   │   └── r2.ts
│   ├── domain/
│   │   └── associate/
│   │       ├── associate.factory.ts
│   │       ├── associate.ts
│   │       └── validator/
│   │           ├── associate-validator.factory.ts
│   │           └── associate-zod.validator.ts
│   ├── repositories/
│   │   ├── associate-repository.interface.ts
│   │   └── associate.repository.ts
│   └── use-case/
│       ├── create-associate.usecase.ts
│       ├── deactivate-associate.usecase.ts
│       ├── edit-associate.usecase.ts
│       ├── find-all-associates-by-unity-id.usecase.ts
│       ├── find-associate-by-id.usecase.ts
│       ├── find-image.usecase.ts
│       ├── generate-associate-pdf.usecase.ts
│       ├── upload-image.usecase.ts
│       ├── dtos/
│       │   ├── create-associate.dto.ts
│       │   ├── find-all-associates-by-unity-id.dto.ts
│       │   └── update-associate.dto.ts
│       └── mappers/
│           ├── find-all-associates.mapper.ts
│           └── find-associate.mapper.ts
├── http/
│   ├── controllers/
│   │   ├── create-associate.controller.ts
│   │   ├── deactivate-associate.controller.ts
│   │   ├── edit-associate.controller.ts
│   │   ├── find-all-associates-by-unity-id.controller.ts
│   │   ├── find-associate-by-id.controller.ts
│   │   └── generate-associate-pdf.controller.ts
│   └── index.ts
├── lib/
│   └── decorators/
│       └── ExceptionHandler.ts
└── types/
    ├── Env.d.ts
    └── Hono.d.ts
```

#### Tecnologias Identificadas:
- **Runtime:** Cloudflare Workers
- **Framework:** Hono (TypeScript web framework)
- **Database:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare R2
- **Validation:** Zod
- **Build Tool:** Bun (bun.lockb presente)

#### Configurações Analisadas:

**wrangler.toml:**
```toml
name = "associate-ms"
main = "http/index.ts"
compatibility_date = "2024-12-31"

r2_buckets = [
  { binding = "R2_BUCKET", bucket_name = "assembleo-fimaprom", preview_bucket_name = "assembleo-fimaprom" },
]

[[d1_databases]]
binding = "DB"
database_name = "assembleo-db-fimaprom"
database_id = "880a0307-3d0b-4fe0-8f88-6799b248f944"
```

### 3. Fragrance Match (Referência para Prisma)
**Localização:** `/home/jose-corte/www/backend/fragrance-match`

#### Configuração Prisma Analisada:
**package.json scripts:**
```json
{
  "migrate": "dotenv -e .dev.vars -- npx prisma migrate dev",
  "generate": "dotenv -e .dev.vars -- npx prisma generate --no-engine",
  "studio": "dotenv -e .dev.vars -- npx prisma studio"
}
```

**Dependencies relevantes:**
- @prisma/adapter-d1: ^6.13.0
- @prisma/client: ^6.13.0
- @prisma/extension-accelerate: ^2.0.2

**prisma/schema.prisma:**
```prisma
generator client {
  provider        = "prisma-client-js"
  output          = "../src/generated/prisma"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

**Estrutura de inicialização:**
```typescript
// src/database/prisma.ts
import { PrismaClient } from "../../generated/prisma";

export let prisma: PrismaClient;

export function initializePrisma(client: PrismaClient) {
  prisma = client;
}
```

## Padrões Arquiteturais Identificados

### Clean Architecture
- **Core/Domain**: Entities e business rules no diretório `core/domain`
- **Use Cases**: Lógica de aplicação em `core/use-case`
- **Repositories**: Interfaces e implementações separadas
- **Controllers**: HTTP layer separada em `http/controllers`

### Domain-Driven Design
- **Entities**: `associate.ts` com lógica de domínio
- **Factories**: `associate.factory.ts` para criação de objetos
- **Validators**: Validação específica do domínio
- **Shared Kernel**: Diretório `@shared` com abstrações comuns

### Repository Pattern
- **Interfaces**: `associate-repository.interface.ts`
- **Implementations**: `associate.repository.ts`
- **Database abstraction**: Separação clara entre domínio e persistência

### Error Handling
- **Exception Decorators**: `ExceptionHandler.ts`
- Tratamento centralizado de erros

### Validation Patterns
- **Zod Integration**: `associate-zod.validator.ts`
- **Factory Pattern**: `associate-validator.factory.ts`
- **Interface Abstraction**: `validator.interface.ts`

## Schema de Dados Atual

### Tabelas Identificadas (database.MD):
1. **associates** - Dados principais dos associados
2. **meetings** - Reuniões e eventos
3. **meeting_participants** - Relação many-to-many
4. **unities** - Unidades/organizações

### Configuração Prisma Implementada:
- Models: Unity, Associate, Meeting, MeetingParticipant
- Adapter: D1 para Cloudflare
- Generator: Cliente TypeScript
- Output: `src/generated/prisma`

## Configuração de Infraestrutura

### Cloudflare Stack:
- **Workers**: Runtime serverless
- **D1**: Database SQLite
- **R2**: Object storage
- **Wrangler**: Deployment e desenvolvimento

### Environment:
- **.dev.vars**: Configurações locais
- **wrangler.toml/jsonc**: Configurações de deploy
- **TypeScript**: Tipagem forte

## Próximos Passos Sugeridos

1. Implementar estrutura similar no assembleo-core-ms
2. Criar use cases seguindo o padrão do associate-ms
3. Implementar repository pattern com Prisma
4. Configurar exception handling
5. Implementar validation layer
6. Estruturar controllers HTTP
7. Configurar testes unitários
8. Documentar APIs

## Observações Importantes

- Ambos os projetos seguem Clean Architecture principles
- Uso consistente do Cloudflare stack
- Separação clara de responsabilidades
- Padrões de naming consistentes
- TypeScript como linguagem principal
- Foco em maintainability e testability

---

**Arquivo criado por:** Claude Code (Anthropic)  
**Data:** 2025-08-09  
**Propósito:** Documentação arquitetural para continuidade com Gemini AI