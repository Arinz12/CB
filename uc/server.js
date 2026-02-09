require("dotenv").config()
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Express middleware
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Custom API routes (Express)
  server.get('/api/test', (req, res) => {
    res.json({ message: 'This is a backend test and it was successfull' });
  });

  // All other routes are handled by Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });


  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})