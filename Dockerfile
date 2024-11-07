# Usar una imagen base oficial de Node.js
FROM node:16

# Crear y establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json
# Si no tienes package-lock.json, omite esta línea
COPY package*.json ./

# Instalar dependencias de Node.js
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto 3000 para que la aplicación sea accesible
EXPOSE 3000

# Comando para ejecutar la aplicación al iniciar el contenedor
CMD ["node", "index.js"]
