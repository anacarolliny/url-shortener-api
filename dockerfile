# Use a imagem Node.js LTS como base
FROM node:20.16.0-alpine

# Configure o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de dependência do aplicativo (package.json e package-lock.json)
COPY package.json package-lock.json ./

# Copie o arquivo .env para o contêiner
COPY .env ./.env

# Instale as dependências do projeto usando npm
RUN npm install

# Instale o Prisma CLI globalmente (caso ainda não esteja instalado)
RUN npm install -g prisma

# Copie os arquivos do projeto para o diretório de trabalho do contêiner
COPY . .

# Porta exposta pelo contêiner (a porta que sua aplicação NestJS estará ouvindo)
EXPOSE 3000

# Comando padrão para iniciar o aplicativo
CMD ["npm", "run", "start:dev"]

