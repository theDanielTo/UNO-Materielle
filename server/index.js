require('dotenv/config');
const express = require('express');
const http = require('http');
// const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const path = require('path');
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
      player: numberOfUsersInRoom === 0 ? 'Player 1' : 'Player 2',
      username: payload.username,
      room: payload.room
    });

    if (error) { return callback(error); }

    socket.join(newUser.room);

    io.to(newUser.room).emit('roomData',
      { room: newUser.room, users: getUsersInRoom(newUser.room) }
    );

    socket.emit('currentUserData',
      { player: newUser.player, username: newUser.username }
    );

    callback();
  });

  socket.on('initGameState', gameState => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('initGameState', gameState);
    }
  });

  socket.on('updateGameState', gameState => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateGameState', gameState);
    }
  });

  socket.on('sendMessage', (payload, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('message',
        { user: user.username, text: payload.message }
      );
    }
    callback();
  });

  socket.on('disconnect', () => {
    socket.leave();
  });

  socket.on('disconnection', gameId => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('roomData',
        { room: user.room, users: getUsersInRoom(user.room) }
      );
    }
    const sql = `
      DELETE from "games"
        WHERE "gameId" = $1;
    `;

    const params = [gameId];

    db.query(sql, params)
      .then(result => {
        // io.to('lobby').emit('game joined', { gameId });
        // socket.to(gameId).emit('user disconnect');
      });
  });
});

app.use(staticMiddleware);
app.use(express.json());

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
  const { code } = req.body;
  const sql = `
    INSERT into "games" ("title", "code")
      VALUES ($1, $2)
      RETURNING *
  `;
  const param = ['game title', code];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.use((req, res) => {
  res.sendFile('/index.html', {
    root: path.join(__dirname, 'public')
  });
});

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`socket.io server listening on port ${process.env.PORT}`);
});
