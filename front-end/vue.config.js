const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
const https = require('https');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

// Create an HTTPS server
const httpsServer = https.createServer({
  key: fs.readFileSync(path.resolve(__dirname, 'certs/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.pem')),
});

// Create a WebSocket server using the HTTPS server
const wss = new WebSocket.Server({ server: httpsServer });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
  });
});

// Start the HTTPS server
httpsServer.listen(8093, () => {
  console.log('Server is listening on port 443');
});

