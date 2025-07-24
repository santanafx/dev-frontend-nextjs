# 🛍️ E-commerce Product Management

Uma aplicação web completa para gerenciamento de produtos, desenvolvida com
Next.js, TypeScript e integração com a FakeStore API.

## 🚀 Deploy

**Acesse a aplicação:**
[https://dev-frontend-nextjs-mmw8e5rlk-santanafxs-projects.vercel.app/login](https://dev-frontend-nextjs-mmw8e5rlk-santanafxs-projects.vercel.app/login)

## 📋 Funcionalidades

- ✅ **CRUD Completo de Produtos**
  - Listagem de produtos
  - Visualização detalhada de produto
  - Criação de novo produto
  - Edição de produto existente
  - Exclusão de produto
- 🔐 **Sistema de Autenticação**
  - Tela de login com validação
  - Gerenciamento de sessão
- 📱 **Interface Responsiva**
  - Menu lateral (sidebar) responsivo
  - Layout otimizado para mobile e desktop
- ⚡ **Performance**
  - Cache inteligente com React Query
  - Feedback visual de carregamento e erros

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes de UI reutilizáveis
- **React Query** - Gerenciamento de estado e cache
- **Axios** - Cliente HTTP
- **Zod** - Validação de esquemas e tipos
- **React Hook Form** - Gerenciamento de formulários
- **Jest** - Framework de testes
- **ESLint** - Linter para qualidade de código
- **Prettier** - Formatador de código
- **Husky** - Git hooks

## 🏗️ Arquitetura do Projeto

### Configuração do Ambiente de Desenvolvimento

O projeto foi iniciado com uma configuração robusta de ferramentas de
desenvolvimento:

- **Prettier**: Formatador de código que garante consistência na formatação,
  removendo discussões sobre estilo de código e mantendo o repositório limpo e
  legível.

- **ESLint**: Linter que identifica e corrige problemas no código
  JavaScript/TypeScript, garantindo qualidade, consistência e boas práticas.

- **Jest**: Framework de testes que permite escrever testes unitários e de
  integração, garantindo que o código funcione conforme esperado.

- **Husky**: Ferramenta que permite configurar Git hooks, automatizando tarefas
  antes de commits e pushes.

### Pre-commit Hook

Foi configurado um pre-commit que executa automaticamente:

- Lint do código (ESLint)
- Verificação de tipagem TypeScript
- Execução dos testes (Jest)

Apenas se todos os checks passarem, o commit é realizado, garantindo qualidade
do código.

### Estratégia de Deploy (CI/CD)

O projeto utiliza uma estratégia de branches para deploy automático:

- **Branch `main`**: Produção - deploy automático na Vercel
- **Branch `development`**: Desenvolvimento - onde são feitas as modificações

**Processo de Deploy:**

1. Desenvolvimento na branch `development`
2. Merge para `main` com `git pull origin development`
3. Push para `main` dispara deploy automático na Vercel

## 📁 Estrutura do Projeto

```
app/
├── (dashboard)/          # Layout compartilhado para dashboard e products
│   ├── dashboard/        # Página principal do dashboard
│   └── products/         # Listagem de produtos
│       └── [id]/         # Página individual de produto
├── login/                # Página de autenticação
└── layout.tsx           # Layout raiz da aplicação

components/
├── common/              # Componentes atômicos reutilizáveis
│   ├── atoms/           # Componentes básicos (botões, inputs, etc.)
│   ├── molecules/       # Combinações de átomos
│   └── organisms/       # Componentes complexos

context/
└── AuthContext.tsx      # Contexto de autenticação

features/                # Componentes específicos de features

hooks/                   # Hooks que podem ser utilizados em diversas partes do projeto

lib/
└── utils/               # Utilitários

providers/               # Componente dos providers do react query e contextApi

service/                 # Camada que contém o axios e as query keys do react query
└── api/
```

### Sistema de Roteamento

O projeto utiliza o App Router do Next.js 14:

- `(dashboard)`: Grupo de rotas que compartilham o mesmo layout
- `[id]`: Rotas dinâmicas para produtos individuais

### Atomic Design

A pasta `components/common` implementa o **Atomic Design**, uma metodologia que
organiza componentes em hierarquias:

- **Atoms**: Componentes básicos
- **Molecules**: Combinações de átomos
- **Organisms**: Componentes complexos

**Vantagens:**

- **Escalabilidade**: Facilita a manutenção e evolução
- **Reutilização**: Componentes podem ser facilmente reutilizados em toda a
  aplicação
- **Consistência**: Garante padrões visuais uniformes
- **Colaboração**: Equipes podem trabalhar em paralelo sem conflitos

### Container/Presentational Pattern

Os componentes em `features/` seguem o **Container/Presentational Pattern**:

- **Containers**: Componentes orquestradores que gerenciam estado, lógica de
  negócio e chamadas de API
- **Presentational**: Componentes puros que recebem props e renderizam UI, sem
  manipulação de estado

**Vantagens:**

- **Separação de responsabilidades**: Lógica separada da apresentação
- **Testabilidade**: Componentes presentacionais são mais fáceis de testar
- **Reutilização**: Presentational components podem ser reutilizados com
  diferentes containers
- **Manutenibilidade**: Mudanças na lógica não afetam a UI e vice-versa

### shadcn/ui

O projeto utiliza **shadcn/ui**, uma biblioteca de componentes que oferece:

- **Flexibilidade**: Uma coleção de componentes copiáveis
- **Customização**: Total controle sobre o código dos componentes
- **Consistência**: Design system baseado em Tailwind CSS
- **Acessibilidade**: Componentes acessíveis por padrão

### Gerenciamento de Estado e Cache

**React Query + Axios:**

- **Cache inteligente**: Dados são cacheados automaticamente
- **Sincronização**: Dados são sincronizados entre abas e componentes
- **Background updates**: Atualizações em segundo plano
- **Error handling**: Tratamento robusto de erros
- **Loading states**: Estados de carregamento automáticos

### Context API

O `AuthContext` gerencia:

- Estado de autenticação do usuário
- Token JWT no localStorage
- Funções de login/logout
- Persistência de sessão

### Sistema de Proteção de Rotas (AuthGuard)

O `AuthGuard` protege automaticamente as rotas do dashboard:

- **Verificação de autenticação**: Verifica se o usuário está logado
- **Redirecionamento**: Redireciona para `/login` se não autenticado
- **Loading state**: Exibe loader durante verificação
- **Rotas protegidas**: `/dashboard`, `/products` e `/products/[id]`

## 🧪 Testes

O projeto inclui testes automatizados com Jest para funções críticas:

- Validação de formulários
- Lógica de autenticação
- Transformação de dados
- Componentes principais

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd dev-frontend-nextjs
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o projeto em modo de desenvolvimento**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Qualidade de código
npm run lint         # Executa ESLint

# Testes
npm run test         # Executa testes
npm run test:watch   # Executa testes em modo watch
npm run test:coverage # Executa testes com cobertura

# TypeScript
npm run type-check   # Verifica tipos TypeScript
```

## 📱 Funcionalidades da API

A aplicação integra com a [FakeStore API](https://fakestoreapi.com/):

- `GET /products` - Lista todos os produtos
- `GET /products/:id` - Obtém detalhes de um produto
- `POST /products` - Cria novo produto
- `PUT /products/:id` - Atualiza produto existente
- `DELETE /products/:id` - Remove produto
