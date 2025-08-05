# Usa una imagen de Node.js oficial
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install -g serve
RUN npm install

# Copia el resto del código
COPY . .

# Genera la build de producción con Vite
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Usa "serve" para servir los archivos de la carpeta dist
CMD ["serve", "-s", "dist", "-l", "3000"]