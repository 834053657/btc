import { message } from 'antd';
import { queryUserDtl, fakeIDNo, fakeAuthResult, closeG2 } from '../services/api';

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
    *closeG2({ payload, callback }, { call, put }) {
      const response = yield call(closeG2, payload);
      if (response.code === 0) {
        yield put({
          type: 'setUserG2',
          payload: response,
        });
        message.success('操作成功！');
      }
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
      return {
        ...state,
        userInfo: payload.data.user_info,
        authInfo: payload.data.auth_info,
        btcInfo: payload.data.btc_info,
        authLogs: payload.data.auth_logs,
      };
    },
    setUserG2(state, { payload }) {
      let userInfo = { ...state.userInfo, google_otp: false };
      return {
        ...state,
        userInfo
      };
    },
    setIDNo(state, { payload }) {
      return {
        ...state,
        idNo: payload,
      };
    },
    setAuthResult(state, { payload }) {
      return {
        ...state,
      };
    },
  },
};
