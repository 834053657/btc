import io from 'socket.io-client';
import { map } from 'lodash';

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
  socket.on('get_history', (res) => {
    let data = JSON.parse(res);
    action({
      type: 'get_history',
      data
    });
  });
}
