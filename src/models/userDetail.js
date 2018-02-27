// import { message } from 'antd';
import { queryUserDtl, fakeIDNo, fakeAuthResult } from '../services/api';

export default {
  namespace: 'userDetail',

  state: {
    userInfo: {},
    idNo: '',
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUserDtl, payload);
      yield put({
        type: 'setDetail',
        payload: response,
      });
    },
    *updateIDNo({ payload, callback }, { call, put }) {
      const response = yield call(fakeIDNo, payload);
      yield put({
        type: 'setIDNo',
        payload: response,
      });
      if (callback) callback();
    },
    *updateAuthResult({ payload, callback }, { call, put }) {
      const response = yield call(fakeAuthResult, payload);
      yield put({
        type: 'setAuthResult',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    setDetail(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        userInfo: payload.data.user_info,
        authInfo: payload.data.auth_info,
        btcInfo: payload.data.btc_info,
        authLogs: payload.data.auth_logs,
      };
    },
    setIDNo(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        idNo: payload,
      };
    },
    setAuthResult(state, { payload }) {
      console.log(payload);
      return {
        ...state,
      };
    },
  },
};
