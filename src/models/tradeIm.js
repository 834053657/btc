// import { message } from 'antd';
import { queryTradeDtl } from '../services/api';
import * as service from '../services/socket';
import { getAuthority } from '../utils/authority';

export default {
  namespace: 'tradeIm',

  state: {
    orderInfo: {
      detail: {},
      op_logs: [],
      prices: {},
      traders: {},
    },
    historyList: []
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
      const orderid = yield select(state => state.tradeIm.orderInfo.detail.order_id);
      const { name } = getAuthority() || {};
      yield socket.emit('get_history', JSON.stringify({ username: name, orderid }));
    },
    *sendMessage({ payload }) {
      const { name } = getAuthority() || {};
      yield socket.emit('send_message', { sender: name, message: payload.message, orderid: 'e7f98a5e', roomid: '1' });
    }
  },

  reducers: {
    setDetail(state, { payload }) {
      let orderInfo = { ...state.orderInfo, ...payload.data };
      return {
        ...state,
        orderInfo
      };
    },
    getHistory(state, { payload }) {
      return {
        ...state,
        historyList: payload.data
      };
    }
  },
  subscriptions: {
    socket({ dispatch }) { // socket相关
      return service.listen(({ type, state, data }) => {
        switch (type) {
          case 'connect':
            if (state === 'success') {
              dispatch({
                type: 'connectSuccess'
              });
            } else {
              dispatch({
                type: 'connectFail'
              });
            }
            break;
          case 'get_history':
            dispatch({
              type: 'getHistory',
              payload: data
            });
            break;
        }
      });
    }
  },
};
