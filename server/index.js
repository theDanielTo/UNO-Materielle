require('dotenv/config');
const express = require('express');
const http = require('http');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

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
  socket.on('test', (str, num, obj) => {
    console.log(str, num, obj);
  });
});

app.use(staticMiddleware);

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`socket.io server listening on port ${process.env.PORT}`);
});
