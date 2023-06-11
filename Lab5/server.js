// const express = require('express');
// const app = express();
// const port = 8060;
// const bodyParser = require('body-parser');
// const axios = require('axios');

// app.use(express.static('public'));
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.sendFile('public/html/index.html', { root: __dirname });
// });

// app.post('/teachers', async (req, res) => {
//   const teacherData = req.body;

//   try {
//     validation(teacherData);
//     const newTeacher = {
//       id: `teacher_${teacherIdCounter++}`,
//       ...teacherData,
//     };
//     await axios.post('http://localhost:3000/teachers', newTeacher);
//     res.status(200).send('Teacher added successfully');
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// app.listen(port, () => {
//   console.log(`Now listening on port ${port}`);
// });

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
