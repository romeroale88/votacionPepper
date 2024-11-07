# Usa una imagen base de Node.js
FROM node:16

# Crea y establece el directorio de trabajo
WORKDIR /

# Instala dependencias adicionales y Xvfb
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxtst6 \
    lsb-release \
    xdg-utils \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Copia package.json y package-lock.json e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Ejecuta la aplicación usando Xvfb
CMD ["xvfb-run", "--server-args='-screen 0 1280x1024x24'", "node", "index.js"]
