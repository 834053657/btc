import io from 'socket.io-client';

export function listen(action) {
  if (socket === '') {
    try {
      socket = io(CONFIG.message_url.im_url, { reconnectionDelayMax: 100, reconnection: false, reconnectionDelay: 10000 });
    } catch (err) {
      action({
        type: 'connect',
        state: 'fail',
        errorMsg: '连接错误'
      });
    }
  }
  socket.on('connect', (msg) => {
    action({
      type: 'connect',
      state: 'success'
    });
  });
  socket.on('connect_timeout', (error) => {
    action({
      type: 'connect',
      state: 'fail',
      errorMsg: '连接超时'
    });
  });
  socket.on('disconnect', (error) => {
    action({
      type: 'connect',
      state: 'fail',
      errorMsg: error
    });
  });
  socket.on('get_history', (res) => {
    let data = JSON.parse(res);
    action({
      type: 'get_history',
      data
    });
  });

  socket.on('create_room', (res) => {
    let data = JSON.parse(res);
    action({
      type: 'create_room',
      data
    });
  });
  socket.on('receive_message', (res) => {
    let data = JSON.parse(res);
    action({
      type: 'send_message',
      data
    });
  });
  socket.on('send_message', (res) => {
    let data = JSON.parse(res);
    action({
      type: 'send_message',
      data
    });
  });
}
