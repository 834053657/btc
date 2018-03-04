import io from 'socket.io-client';

export function listen(action) {
  if (socket === '') {
    try {
      socket = io(CONFIG.message_url.im_url, { reconnectionDelayMax: 100, reconnection: false, reconnectionDelay: 10000 });
      action({
        type: 'connect',
        state: 'success'
      });
    } catch (err) {
      action({
        type: 'connect',
        state: 'fail'
      });
    }
  }
  socket.on('message', () => {
    action({
      type: 'message'
    });
  });
}
