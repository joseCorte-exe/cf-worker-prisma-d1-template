# Template Arquitetural - Clean Architecture + DDD

## Visão Geral Arquitetural

Este documento define os padrões arquiteturais, estrutura de diretórios e convenções de nomenclatura para microsserviços seguindo **Clean Architecture** e **Domain-Driven Design**.

## Estrutura de Diretórios

```
src/
├── @shared/              # Abstrações e utilitários compartilhados
├── entities/            # Entidades de domínio
│   └── {domain}/        # Aggregates por domínio
├── errors/              # Sistema de erros tipados
├── middlewares/         # Middlewares da aplicação
├── modules/             # Módulos organizados por domínio
│   └── {module-name}/   # Ex: associate, workflow, user
│       ├── {module}.module.ts     # Configuração do módulo
│       ├── use-cases/             # Casos de uso do módulo
│       │   ├── {action-name}/     # Casos de uso específicos
│       │   │   ├── {action-name}.use-case.ts
│       │   │   ├── {action-name}.controller.ts
│       │   │   └── {action-name}.spec.ts
│       │   └── dtos/              # DTOs do módulo
│       │       └── {action-name}.dto.ts
│       ├── repositories/          # Repositories do módulo
│       │   ├── {entity}-repository.interface.ts
│       │   └── {storage}-{entity}.repository.ts
│       └── services/              # Serviços específicos do módulo
├── repositories/        # Repositories globais/compartilhados
├── services/           # Serviços globais
└── types/              # Definições de tipos TypeScript globais
```

## Padrões Arquiteturais Implementados

### 1. Modular Architecture + Clean Architecture + DDD

#### Module Organization (`modules/`)
- **Domain Modules**: Cada módulo representa um domínio/contexto delimitado
- **Module Configuration**: Arquivo `{module}.module.ts` centraliza configurações do módulo
- **Encapsulamento**: Use-cases, repositories e services específicos ficam dentro do módulo
- **Separation of Concerns**: Separação clara entre módulos e funcionalidades globais

```typescript
// modules/{module}/{module}.module.ts
export class {Module}Module {
  // Configuração de dependências
  // Providers específicos do módulo
  // Exports para outros módulos
}
```

#### Domain Layer (`entities/`)
- **Entity Base**: Classe abstrata com identificação única
- **Domain Aggregates**: Entidades principais com comportamentos de negócio
- **Value Objects**: Objetos imutáveis com lógica específica
- **Factories**: Criação controlada de entidades complexas

```typescript
// entities/{domain}/{entity}.ts
export class {Entity} extends Entity {
  constructor(
    protected _id: string,
    private _{property}: string,
    public {valueObject}: {ValueObject},
  ) {
    super(_id);
  }
}
```

#### Application Layer (`modules/{module}/use-cases/`)
- **Use Cases**: Lógica de aplicação isolada e testável por módulo
- **DTOs**: Contratos de entrada/saída específicos do módulo
- **Dependency Injection**: Inversão de dependências via construtor
- **Module Scoped**: Cada módulo tem seus próprios use-cases

```typescript
// modules/{module}/use-cases/{action-name}/{action-name}.use-case.ts
export class {Action}UseCase {
  constructor(
    private readonly {entity}Repository: {Entity}RepositoryInterface,
  ) {}
}
```

### 2. Repository Pattern
- **Module Repositories**: Repositories específicos dentro de cada módulo
- **Global Repositories**: Repositories compartilhados entre módulos
- **Interfaces**: Contratos abstratos para persistência
- **Implementações**: Acoplamento baixo com infraestrutura específica
- **Type Safety**: Tipagem forte nos contratos de dados

### 3. Factory Pattern
- **Entity Factories**: Criação consistente de entidades complexas
- **Value Object Factories**: Criação de objetos de valor com validação
- **ID Generation**: Identificadores únicos (cuid, uuid, etc.)

### 4. Error Handling Strategy
- **Typed Errors**: Sistema de erros tipados e extensíveis
- **Base Error**: Classe base genérica para todos os erros
- **Domain Errors**: Erros específicos de cada domínio

```typescript
// errors/base-error.ts
export class BaseError<T extends string> extends Error {
  constructor({ name, message, cause }: BaseErrorType<T>) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}
```

### 5. Value Object Pattern
- **Immutable Objects**: Objetos que representam valores do domínio
- **Version Control**: Controle de versões quando aplicável
- **Audit Trail**: Rastreamento de mudanças quando necessário
- **Domain Logic**: Lógica específica encapsulada

```typescript
// types/{domain}.ts
export enum {Domain}States {
  STATE_ONE = 'STATE_ONE',
  STATE_TWO = 'STATE_TWO',
  STATE_THREE = 'STATE_THREE',
  // Define estados específicos do domínio
}
```

## Estratégias de Nomenclatura

### Arquivos e Diretórios
- **kebab-case**: Para nomes de arquivos e diretórios
- **PascalCase**: Para classes e interfaces
- **camelCase**: Para métodos e variáveis
- **SCREAMING_SNAKE_CASE**: Para enums e constantes

### Estrutura de Módulos
```
modules/
├── {module-name}/              # Ex: associate, user, workflow
│   ├── {module}.module.ts      # Configuração do módulo
│   ├── use-cases/
│   │   ├── {action-name}/
│   │   │   ├── {action-name}.use-case.ts
│   │   │   ├── {action-name}.controller.ts
│   │   │   ├── {action-name}.factory.ts
│   │   │   └── {action-name}.spec.ts
│   │   └── dtos/
│   │       └── {action-name}.dto.ts
│   ├── repositories/
│   │   ├── {entity}-repository.interface.ts
│   │   └── {storage}-{entity}.repository.ts
│   └── services/
│       └── {domain}-{service}.service.ts
```

### Padrões de Naming
- **Modules**: `{Domain}Module` (ex: `AssociateModule`, `UserModule`)
- **Use Cases**: `{Verb}{Noun}UseCase` (ex: `CreateUserUseCase`)
- **Controllers**: `{Verb}{Noun}Controller`
- **Factories**: `{Entity}Factory` com métodos estáticos
- **Repositories**: `{Entity}RepositoryInterface` e `{Storage}{Entity}Repository`
- **Data Transfer Objects**: `{Action}{Entity}DTO`
- **Services**: `{Domain}{Purpose}Service` (ex: `UserAuthenticationService`)

## Estratégias de Testabilidade

### Test Organization
- **Co-location**: Testes próximos ao código fonte
- **Naming**: Sufixo `.spec.ts` para testes unitários
- **Factory Testing**: Testes dedicados para factories
- **Use Case Testing**: Testes isolados para lógica de aplicação

### Dependency Injection
- **Constructor Injection**: Facilita mocking em testes
- **Interface Segregation**: Contratos mínimos e focados
- **Testable Architecture**: Separação clara de responsabilidades

## Infraestrutura e Tecnologias

### Runtime & Framework
- **Serverless Runtime**: Workers, Lambda, etc.
- **TypeScript**: Type safety e developer experience
- **Package Manager**: npm, pnpm, bun, yarn

### Storage Strategy
- **Database Abstraction**: Repository pattern para múltiplos storages
- **Storage Options**: SQL, NoSQL, KV stores, etc.
- **Migration Strategy**: Versionamento e evolução de schema

### Development Tools
- **Linting**: ESLint, Biome, etc.
- **Build Tools**: Vite, Webpack, esbuild, etc.
- **Deploy**: Plataforma específica (Cloudflare, AWS, etc.)

## Princípios Aplicados

### SOLID Principles
- **Single Responsibility**: Cada classe tem uma responsabilidade clara
- **Open/Closed**: Extensível via herança e interfaces
- **Liskov Substitution**: Implementações intercambiáveis
- **Interface Segregation**: Interfaces específicas e mínimas
- **Dependency Inversion**: Dependências abstratas via interfaces

### Domain-Driven Design
- **Ubiquitous Language**: Terminologia consistente no código
- **Bounded Context**: Fronteiras claras do domínio
- **Aggregates**: Workflow como raiz de agregação
- **Value Objects**: State como objeto de valor imutável

### Clean Code Principles
- **Meaningful Names**: Nomes expressivos e intencionais
- **Small Functions**: Funções focadas e testáveis
- **No Comments**: Código auto-explicativo
- **Error Handling**: Tratamento explícito de erros

## Padrões de Evolução

### Extensibilidade
- **Modular Design**: Novos domínios podem ser adicionados como módulos independentes
- **Factory Pattern**: Facilita criação de novos tipos de entidades
- **Value Object Pattern**: Permite novos comportamentos sem quebrar existentes
- **Repository Pattern**: Suporta múltiplos tipos de storage
- **Use Case Pattern**: Novos casos de uso independentes por módulo

### Maintainability
- **Type Safety**: Reduz bugs em tempo de execução
- **Test Coverage**: Garante qualidade e refactoring seguro
- **Clear Architecture**: Facilita onboarding de novos desenvolvedores
- **Consistent Patterns**: Reduz curva de aprendizado

## Resumo dos Benefícios

1. **Modularidade**: Separação clara de domínios e responsabilidades por módulo
2. **Testabilidade**: Arquitetura facilita testes unitários e de integração
3. **Manutenibilidade**: Código limpo e bem estruturado
4. **Extensibilidade**: Fácil adição de novos módulos e recursos
5. **Scalabilidade**: Módulos podem ser desenvolvidos e deployados independentemente
6. **Type Safety**: Redução significativa de bugs
7. **Performance**: Arquitetura otimizada para runtime escolhido
8. **Developer Experience**: Tooling moderno e produtivo

---

Este template estabelece uma base sólida para microsserviços escaláveis e maintíveis, aplicando as melhores práticas de Clean Architecture e Domain-Driven Design independente da stack tecnológica escolhida.