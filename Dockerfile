# Use a versão do Node.js 14 com Alpine Linux
FROM node:14-alpine

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Atualiza o npm para a versão mais recente
RUN npm install -g npm@latest

# Instala as dependências do npm, incluindo as devDependencies
RUN npm install --production=false

# Copia o restante do código da aplicação para o diretório de trabalho
COPY . .

# Compila a aplicação TypeScript
RUN npm run build

# Expõe a porta na qual a aplicação será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
