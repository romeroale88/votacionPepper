const express = require('express');
const puppeteer = require('puppeteer');
const { exec } = require('child_process');

// Datos de proxy de DataImpulse
const PROXY_HOST = 'gw.dataimpulse.com';
const PROXY_PORT = '823';
const USERNAME = '01260b6ec9b63209b3f1';
const PASSWORD = 'dace84b207c9e71c';

// Inicializa la app de Express
const app = express();
const PORT = 3000;

// Servir el archivo HTML con el botón
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Ruta para ejecutar Puppeteer y extraer contenido
app.get('/scrape', async (req, res) => {
    try {
        console.log('Launching browser with DataImpulse proxy...');

        // Inicia Xvfb (servidor X virtual) para crear el entorno gráfico
        exec('Xvfb :99 -screen 0 1024x768x24 & export DISPLAY=:99', async (err, stdout, stderr) => {
            if (err) {
                console.error('Error al iniciar Xvfb:', err);
                return;
            }
            console.log('Xvfb iniciado con éxito');

            // Inicia Puppeteer en modo no headless
            const browser = await puppeteer.launch({
                headless: false,
                args: [
                    `--proxy-server=${PROXY_HOST}:${PROXY_PORT}`,
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                    '--disable-software-rasterizer',
                    '--remote-debugging-port=9222', // Opcional, para depuración remota
                    '--display=:99'  // Usar el servidor Xvfb como pantalla
                ],
                executablePath: puppeteer.executablePath(),
            });

            const page = await browser.newPage();

            // Autenticar en el proxy
            await page.authenticate({
                username: USERNAME,
                password: PASSWORD
            });

            // Verificar la IP visitando una página de prueba
            await page.goto('https://httpbin.org/ip', { waitUntil: 'networkidle2' });
            const ipInfo = await page.evaluate(() => document.body.innerText);
            console.log('Current IP:', ipInfo);

            // Navegar a la página objetivo
            await page.goto('https://zonavip.com.ar/mejor-salon-de-indumentaria-chaco-2023-2024-rubro-empresarial/', { waitUntil: 'networkidle2' });
            
            // Extraer el contenido HTML (como en tu código)
            // Enviar el HTML al cliente
            // res.send(html);
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Error al realizar la extracción de contenido');
    }
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor web ejecutándose en http://localhost:${PORT}`);
});
