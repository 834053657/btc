// import { message } from 'antd';
import { queryTradeDtl } from '../services/api';

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
    }
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
