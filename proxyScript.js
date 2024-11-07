
const puppeteer = require('puppeteer');

// DataImpulse Proxy Credentials
const PROXY_HOST = 'gw.dataimpulse.com';
const PROXY_PORT = '823';
const USERNAME = '01260b6ec9b63209b3f1';
const PASSWORD = 'dace84b207c9e71c';

// Main function to launch Puppeteer and visit the page with the proxy
async function run() {
    try {
        console.log('Launching browser with DataImpulse proxy...');

        // Launch Puppeteer with the DataImpulse proxy
        const browser = await puppeteer.launch({ 
            headless: false,
            args: [
                `--proxy-server=${PROXY_HOST}:${PROXY_PORT}`
            ]
        });

        const page = await browser.newPage();

        // Authenticate with the DataImpulse proxy
        await page.authenticate({
            username: USERNAME,
            password: PASSWORD
        });

        // Verify IP by visiting a test page
        await page.goto('https://httpbin.org/ip', { waitUntil: 'networkidle2' });
        const ipInfo = await page.evaluate(() => document.body.innerText);
        console.log('Current IP:', ipInfo);

        // Navigate to the target page
        await page.goto('https://zonavip.com.ar/mejor-salon-de-indumentaria-chaco-2023-2024-rubro-empresarial/', { waitUntil: 'networkidle2' });
        
        // Extract the HTML content of the target page
        const html = await page.content();
        console.log(html); // Display content to confirm page loaded

        // Close the browser after completion
        // await browser.close();
    } catch (error) {
        console.log('Error:', error);
    }
}

// Run the application
run();
