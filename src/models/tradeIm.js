import { notification } from 'antd';
import { reverse, mapKeys } from 'lodash';
import { changeTradeStatus, queryTradeDtl, queryImHistory } from '../services/api';
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
    historyList: [],
    roomInfo: {}
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTradeDtl, payload);
      yield put({
        type: 'setDetail',
        payload: response,
      });
      yield socket.connect();
    },
    *fetchImHistory({ payload }, { call, put }) {
      const response = yield call(queryImHistory, payload);
      yield put({
        type: 'getHistory',
        payload: response
      });
    },
    *connectSuccess({ payload }, { call, put, select }) {
      const { detail: { order_id }, traders: { dealer = {}, owner = {} } } = yield select(state => state.tradeIm.orderInfo);
      const { name } = getAuthority() || {};
      yield socket.emit('create_room', JSON.stringify({ username: name, orderid: order_id, members: [name, dealer.name, owner.name] }));
    },
    *sendMessage({ payload, callback }, { select }) {
      const { message, messagetype = 1 } = payload;
      const { name } = getAuthority() || {};
      const { roomInfo: { roomid } } = yield select(state => state.tradeIm);
      yield socket.emit('send_message', JSON.stringify({ sender: name, message, roomid, messagetype }));
      if (callback) callback();
    },
    *createRoomed({ payload }, { put }) {
      const { name } = getAuthority() || {};
      const { roomid } = payload.data || {};
      // yield socket.emit('get_history', JSON.stringify({ username: name, roomid }));
      yield put({ type: 'setRoomInfo', payload });
    },
    *Unmount({ payload }, { put }) {
      if (socket) { yield socket.close(); }
      yield put({ type: 'clearState' });
    },
    *complaintMsg({ payload, callback }, { select }) {
      const { name } = getAuthority() || {};
      const { roomInfo: { roomid } } = yield select(state => state.tradeIm);
      yield socket.emit('complaint_end', JSON.stringify({ sender: name, roomid }));
      if (callback) callback();
    },
    *changeStatus({ payload, callback }, { call, put }) {
      const { status } = payload;
      const messagetype = status === 'DONE' ? 8 : 9;
      const message = CONFIG.note_types[messagetype];
      const response = yield call(changeTradeStatus, payload);

      yield put({ type: 'fetch', payload: { id: payload.id } });
      yield put({ type: 'complaintMsg' });
      yield put({ type: 'sendMessage', payload: { message, messagetype } });
      if (callback) callback(response);
    },
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
        historyList: reverse(payload.data.message || [])
      };
    },
    addHistory(state, { payload }) {
      let historyList = [...state.historyList];
      historyList.push(payload.data);
      return {
        ...state,
        historyList
      };
    },
    setRoomInfo(state, { payload }) {
      const membersonlinestatus = mapKeys(payload.data.membersonlinestatus, (v, k) => v.name);
      return {
        ...state,
        roomInfo: { ...payload.data, membersonlinestatus }
      };
    },
    clearState() {
      return {
        orderInfo: {
          detail: {},
          op_logs: [],
          prices: {},
          traders: {},
        },
        historyList: [],
        roomInfo: {}
      };
    }
  },
  subscriptions: {
    socket({ dispatch }) { // socket相关
      return service.listen(({ type, state, data, errorMsg }) => {
        switch (type) {
          case 'connect':
            if (state === 'success') {
              dispatch({
                type: 'connectSuccess'
              });
            } else {
              notification.open({
                message: '连接错误',
                description: errorMsg,
              });
            }
            break;
          case 'get_history':
            dispatch({
              type: 'getHistory',
              payload: data
            });
            break;
          case 'create_room':
            dispatch({
              type: 'createRoomed',
              payload: data
            });
            break;
          case 'receive_message':
          case 'send_message':
            dispatch({
              type: 'addHistory',
              payload: data
            });
            break;
        }
      });
    }
  },
};
