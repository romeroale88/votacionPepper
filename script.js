document.getElementById('run-button').addEventListener('click', async () => {
  try {
      const response = await fetch('/run-puppeteer');
      const data = await response.json();

      if (response.ok) {
          document.getElementById('ip').textContent = data.ipInfo;
          document.getElementById('html-content').textContent = data.html;
      } else {
          alert('Error al ejecutar Puppeteer');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al ejecutar Puppeteer');
  }
});
