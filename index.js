const express = require('express');
const path = require('path');
const client = require('prom-client');  // Prometheus metrics client
const app = express();
const port = 3000;

// ===== Prometheus Metrics Setup =====
// Enable collection of default metrics (CPU, memory, etc.)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Create a custom metric for HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'statusCode'],
});

// Middleware to count requests
app.use((req, res, next) => {
  // Count the request immediately
  httpRequestCounter.inc({
    method: req.method,
    route: req.path
  });
  
  // When the response finishes, update the status code
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      statusCode: res.statusCode
    });
  });
  
  next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});
// ===== End Prometheus Setup =====

// Your existing routes and middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('<h1>Welcome to My Resume Server!</h1><p><a href="/resume.pdf">Download my resume</a></p>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`Metrics available at http://localhost:${port}/metrics`);
});
