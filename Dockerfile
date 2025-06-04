FROM node:20-alpine
WORKDIR /usr/src/app

# Copia dependencias e instala
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

EXPOSE 3000

# Arranca la aplicación con npm run start
CMD ["npm", "run", "start"]
