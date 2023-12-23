// Trong file socket.js
import http from 'http';
import { Server } from 'socket.io';
import app from '../index.js'

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Đóng kết nối khi client disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

export default io;
