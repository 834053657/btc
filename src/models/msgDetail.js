import { message } from 'antd';
import { queryMsgDtl, fakeMsg } from '../services/api';

export default {
  namespace: 'msgDetail',

  state: {
    data: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMsgDtl, payload);
      yield put({
        type: 'setDetail',
        payload: response,
      });
    },
    *saveMsg({ payload, callback }, { call, put }) {
      const response = yield call(fakeMsg, payload);
      if (response.code === 0) {
        message.success('保存成功');
      }
      yield put({
        type: 'fakeMsg',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    setDetail(state, { payload }) {
      let { data } = payload || {};
      return {
        ...state,
        data,
      };
    },
    fakeMsg(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
