import { queryUserDtl } from '../services/api';
import { message } from 'antd';

export default {
  namespace: 'user_detail',

  state: {data: {}},

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUserDtl, payload);
      yield put({
        type: 'setDetail',
        payload: response,
      });
    },
    *submitFormMsg({ payload }, { call, put }) {
      yield call(fakeSubmitFormMsg, payload);
      yield put({
        type: 'setDetail',
        payload,
      });
    },
  },

  reducers: {
    setDetail(state, { payload }) {
      console.log(payload)
      return {
        ...state,
        data: payload,
      };
    },
  },
};
