// import { message } from 'antd';
import { queryUserDtl, fakeIDNo, fakeAuthResult } from '../services/api';

export default {
  namespace: 'tradeDetail',

  state: {
    tradeDetail: {},
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
    *updateIDNo({ payload }, { call, put }) {
      const response = yield call(fakeIDNo, payload);
      yield put({
        type: 'setIDNo',
        payload: response,
      });
    },
    *updateAuthResult({ payload }, { call, put }) {
      const response = yield call(fakeAuthResult, payload);
      yield put({
        type: 'setAuthResult',
        payload: response,
      });
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
