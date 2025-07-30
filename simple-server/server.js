import http from 'node:http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;
  res.end('Welcome to our Node.js Server!');
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
