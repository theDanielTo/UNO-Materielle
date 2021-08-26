require('dotenv/config');
const express = require('express');
const http = require('http');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
});

io.on('connection', socket => {
  // socket.on('join lobby', () => {
  //   socket.join('lobby');
  // });
  console.log(socket.id);
});

app.use(staticMiddleware);

app.post('/api/users', (req, res, next) => {
  const { username } = req.body;
  const sql = `
    INSERT into "users" ("username")
      VALUES (username)
      RETURNING *
  `;
  const param = [username];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`socket.io server listening on port ${process.env.PORT}`);
});
