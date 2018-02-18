// import { message } from 'antd';
import { queryUserDtl, queryUserLog } from '../services/api';

export default {
  namespace: 'userDetail',

  state: {
    userInfo: {},
    authLogs: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUserDtl, payload);
      yield put({
        type: 'setDetail',
        payload: response,
      });
    },
    *fetchLog({ payload }, { call, put }) {
      const response = yield call(queryUserLog, payload);
      yield put({
        type: 'setLog',
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
    setLog(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        logData: payload,
      };
    },
  },
};
