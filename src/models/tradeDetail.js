// import { message } from 'antd';
import { queryTradeDtl, changeTradeStatus } from '../services/api';

export default {
  namespace: 'tradeDetail',

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
    *changeStatus({ payload, callback }, { call, put }) {
      const { status } = payload;
      const messagetype = status === 'DONE' ? 8 : 9;
      const message = CONFIG.note_types[messagetype];
      const response = yield call(changeTradeStatus, payload);

      yield put({ type: 'fetch', payload: { id: payload.id } });
      yield put({ type: 'tradeIm/complaintMsg' });
      yield put({ type: 'tradeIm/sendMessage', payload: { message, messagetype } });
      if (callback) callback(response);
    },
  },

  reducers: {
    setDetail(state, { payload }) {
      return {
        ...state,
        ...payload.data
      };
    },
  },
};
