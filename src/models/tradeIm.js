// import { message } from 'antd';
import { queryTradeDtl } from '../services/api';
import * as service from '../services/socket';
import { getAuthority } from '../utils/authority';

export default {
  namespace: 'tradeIm',

  state: {
    detail: {},
    op_logs: [],
    prices: {},
    traders: {}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTradeDtl, payload);
      yield put({
        type: 'setDetail',
        payload: response,
      });
    },
    *connectSuccess({ payload }, { call, put, select }) {
      const orderid = yield select(state => state.tradeIm.detail.order_id);
      console.log('start get_history', orderid);
      const { name } = getAuthority() || {};
      yield socket.emit('get_history', { username: name, orderid }, () => {
        console.log('get history ok');
      });
    },
    *sendMessage({ payload }) {
      const { name } = getAuthority() || {};
      yield socket.emit('send_message', { sender: name, message: payload.message, orderid: 'e7f98a5e', roomid: '1' });
    }
  },

  reducers: {
    setDetail(state, { payload }) {
      return {
        ...state,
        ...payload.data
      };
    }
  },
  subscriptions: {
    socket({ dispatch }) { // socket相关
      return service.listen((data) => {
        switch (data.type) {
          case 'connect':
            if (data.state === 'success') {
              dispatch({
                type: 'connectSuccess'
              });
            } else {
              console.log('connectFail');
              dispatch({
                type: 'connectFail'
              });
            }
            break;
          case 'welcome':
            dispatch({
              type: 'welcome'
            });
            break;
        }
      });
    }
  },
};
