
# URL Shortener API

Este projeto é uma API de encurtador de URLs construída com NestJS. Ele permite aos usuários encurtar URLs, gerenciar suas URLs encurtadas e rastrear estatísticas de acesso.

## Índice

- [Requisitos de Ambiente](#requisitos-de-ambiente)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Rodando a Aplicação](#rodando-a-aplicação)
- [Endpoints Principais](#endpoints-principais)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Boas Práticas Implementadas](#boas-práticas-implementadas)
- [Documentação da API](#documentação-da-api)

## Requisitos de Ambiente

Este projeto requer a versão `20.16.0` do Node.js. Para garantir que você está utilizando a versão correta, siga as instruções abaixo.

### Usando `nvm` para Gerenciar a Versão do Node.js

O projeto inclui um arquivo `.nvmrc` que especifica a versão necessária do Node.js. Para utilizar essa versão:

1. Instale o `nvm`:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   ```

2. Instale a versão correta do Node.js:
   ```bash
   nvm install
   ```

3. Use a versão especificada:
   ```bash
   nvm use
   ```

### Usando `engines` no `package.json`

O `package.json` deste projeto especifica a versão exata `20.16.0` do Node.js. A configuração `engineStrict` está ativada, o que significa que se a versão do Node.js na sua máquina não for a exata especificada, a instalação das dependências será interrompida.

Para verificar se você está utilizando a versão correta do Node.js, execute:

```bash
node -v
```

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/url-shortener-api.git
   cd url-shortener-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração

1. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env` e configure as variáveis conforme necessário.

```env
# Configuração do Banco de Dados PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=secret
POSTGRES_DB=urlshortener
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# URL de Conexão do Banco de Dados
DATABASE_URL=postgresql://postgres:secret@postgres:5432/urlshortener

# Configuração do JWT
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRES_IN=3600s

# Configuração da Porta da Aplicação
PORT=4000
APP_HOST=http://localhost

THROTTLER_TTL=300
THROTTLER_LIMIT=100

```

2. Configure o banco de dados:
   ```bash
   npx prisma migrate dev
   ```

## Rodando a Aplicação

1. Inicie o Docker (se estiver usando Docker Compose):
   ```bash
   docker-compose up -d
   ```

2. Inicie a aplicação:
   ```bash
   npm run start:dev
   ```

3. Acesse a aplicação:
   - A API estará disponível em: `http://localhost:3000`.

## Endpoints Principais

- **Autenticação:**
  - `POST /auth/login`: Faz login e retorna um token JWT.

- **Usuários:**
  - `POST /users`: Cria um novo usuário.

- **URLs Encurtadas:**
  - `POST /short-url`: Cria uma URL curta.
  - `GET /short-url/user/all`: Lista todas as URLs curtas de um usuário com paginação.
  - `GET /short-url/:id`: Busca uma URL curta por ID.
  - `GET /redirect/:shortUrl`: Redireciona para a URL original e contabiliza o clique.

## Estrutura do Projeto

```plaintext
📂 src/
├── 📂 configs/         # Arquivos de configuração do projeto
├── 📂 database/        # Configuração e manipulação do banco de dados
│   ├── 📂 repositories/  # Operações de banco de dados e lógica de acesso a dados
├── 📂 modules/         # Módulos principais do projeto
│   ├── 📂 auth/        # Módulo de autenticação e autorização
│   ├── 📂 short-url/   # Módulo de encurtamento de URLs
│   ├── 📂 users/       # Módulo de usuários
├── 📂 providers/       # Providers para serviços externos e bibliotecas
├── 📂 shared/          # Componentes e utilitários compartilhados
│   ├── 📂 middlewares/ # Middleware customizados
│   ├── 📂 decorators/  # Decorators customizados
│   ├── 📂 interfaces/  # Interfaces e definições de tipos compartilhadas
│   ├── 📂 interceptors/ # Interceptores customizados
│   ├── 📂 utils/       # Funções utilitárias e módulos de ajuda
└── 📂 main.ts          # Arquivo principal de entrada da aplicação
```

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construção de aplicações escaláveis e testáveis.
- **Prisma**: ORM utilizado para interagir com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado no projeto.
- **Docker**: Para containerização dos serviços e fácil configuração do ambiente.
- **JWT**: Utilizado para autenticação e autorização via tokens.
- **Swagger**: Ferramenta para documentação e testes da API.


## Melhorias Futuras

- **Automação de Testes**: Implementação de testes unitários e de integração para garantir a qualidade do código.
- **Gestão de Ambientes**: Configuração separada para ambientes de desenvolvimento, homologação e produção.
- **Autenticação Avançada**: Adicionar suporte a OAuth para fornecer autenticação com provedores externos.
- **Otimização de Consultas**: Ampliar o uso de cache para otimizar consultas frequentes.
- **Administração Centralizada**: Desenvolvimento de um módulo administrativo para gerenciamento de usuários e URLs encurtadas.

## Boas Práticas Implementadas

- **Autenticação JWT**: Uso de tokens JWT para autenticação segura.
- **Rate Limiting**: Implementação de limite de requisições para prevenir abusos.
- **Swagger**: Documentação interativa da API com Swagger.
- **Versionamento de Rotas**: Implementação de versionamento de rotas para gerenciar diferentes versões da API.

## Documentação da API

A aplicação URL Shortener oferece uma documentação interativa da API gerada automaticamente pelo Swagger. Para acessar a documentação, inicie a aplicação e navegue até `http://localhost:4000/api-docs` ou, em ambiente de produção, acesse o endereço correspondente, como `https://seu-dominio.com/api-docs`, diretamente em seu navegador.


