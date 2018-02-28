// import { message } from 'antd';
import { queryTradeDtl } from '../services/api';

export default {
  namespace: 'tradeIm',

  state: {
    temp: 1
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTradeDtl, payload);
      yield put({
        type: 'setDetail',
        payload: response,
      });
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
