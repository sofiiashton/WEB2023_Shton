const express = require('express');
const jsonServer = require('json-server');

const app = express();
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = 8060;

app.use(express.static('public'));
app.use(express.json());

server.use(middlewares);
server.use(router);

app.use('/api', server);

app.get('/', (req, res) => {
  res.sendFile('public/html/index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
