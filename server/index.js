require('dotenv/config');
const express = require('express');
const http = require('http');
const ClientError = require('./client-error');
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
  // console.log(socket.id);
});

app.use(staticMiddleware);
app.use(express.json());

app.post('/api/users', (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    throw new ClientError(400, 'missing required fields');
  }
  const sql = `
    INSERT into "users" ("username")
      VALUES ($1)
      RETURNING *
  `;
  const param = [name];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/games', (req, res, next) => {
  const sql = `
    SELECT *
      FROM "games"
  `;
  db.query(sql)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.post('/api/games', (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    throw new ClientError(400, 'missing required fields');
  }
  const sql = `
    INSERT into "games" ("gameTitle", "numPlayers")
      VALUES ($1, $2)
      RETURNING *
  `;
  const param = [title, 4];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`socket.io server listening on port ${process.env.PORT}`);
});
