FROM node:16-slim

# Instalar dependencias necesarias para Puppeteer y Xvfb
RUN apt-get update && apt-get install -y \
    libx11-dev \
    libxkbfile-dev \
    libsecret-1-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libappindicator3-1 \
    libasound2 \
    libxtst6 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libnspr4 \
    libgbm1 \
    xdg-utils \
    xvfb \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo y copiar el código
WORKDIR /app
COPY . .

# Instalar dependencias de la app
RUN npm install

# Exponer el puerto y definir el comando de inicio
EXPOSE 3000
CMD ["npm", "start"]
