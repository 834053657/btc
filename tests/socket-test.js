const io = require('socket.io-client');

const socket = io('http://47.52.250.12:8098', { reconnectionDelayMax: 100, reconnection: false, reconnectionDelay: 10000 });
console.log('123');
socket.on('connect', () => {
  console.log('connect');
  socket.on('test', (data) => {
    console.log('test', data);
  });
  socket.on('get_history', (data) => {
    console.log(' get_history return', data);
  });
  socket.emit('get_history', JSON.stringify({ username: 'jack', orderid: '21n12kdh22uid1' }), (data) => {
    console.log(' get_history ok', data);
  });
  socket.emit('hi', '', (data) => {
    console.log('hi ok', data);
  });
});

