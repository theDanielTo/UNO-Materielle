require('dotenv/config');
const express = require('express');
const http = require('http');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const db = require('./db');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
});

io.on('connection', socket => {
  socket.on('join', (payload, callback) => {
    const numberOfUsersInRoom = getUsersInRoom(payload.room).length;

    const { error, newUser } = addUser({
      id: socket.id,
      name: numberOfUsersInRoom === 0 ? 'Player 1' : 'Player 2',
      room: payload.room
    });

    if (error) { return callback(error); }

    socket.join(newUser.room);

    io.to(newUser.room).emit('roomData', { room: newUser.room, users: getUsersInRoom(newUser.room) });
    socket.emit('currentUserData', { name: newUser.name });
    callback();
  });

  socket.on('initGameState', gameState => {
    const user = getUser(socket.id);
    if (user) { io.to(user.room).emit('initGameState', gameState); }
  });

  socket.on('updateGameState', gameState => {
    const user = getUser(socket.id);
    if (user) { io.to(user.room).emit('updateGameState', gameState); }
    console.log(user, gameState);
  });

  // socket.on('disconnection', () => {
  //   const user = removeUser(socket.id);
  //   if (user) { io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) }); }
  // });
});

app.use(staticMiddleware);
app.use(express.json());

// app.post('/api/users', (req, res, next) => {
//   const { name } = req.body;
//   if (!name) {
//     throw new ClientError(400, 'missing required fields');
//   }
//   const sql = `
//     INSERT into "users" ("username")
//       VALUES ($1)
//       RETURNING *
//   `;
//   const param = [name];
//   db.query(sql, param)
//     .then(result => res.status(201).json(result.rows[0]))
//     .catch(err => next(err));
// });

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
    INSERT into "games" ("gameTitle", "numPlayers", "isStarted")
      VALUES ($1, $2, false)
      RETURNING *
  `;
  const param = [title, 4];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/api/lobbies', (req, res, next) => {
  const { gameId, userId } = req.body;
  const sql = `
    INSERT into "lobbies" ("gameId", "userId")
      VALUES ($1, $2)
      RETURNING *
  `;
  const param = [gameId, userId];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`socket.io server listening on port ${process.env.PORT}`);
});
