# Use uma imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o código fonte para o diretório de trabalho do contêiner
COPY . .

# Exponha a porta 3000 para que o aplicativo seja acessível externamente
EXPOSE 3000

# Comando para iniciar o servidor quando o contêiner for iniciado
CMD ["node", "app.js"]
