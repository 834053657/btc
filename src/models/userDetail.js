// import { message } from 'antd';
import { queryUserDtl, queryUserLog } from '../services/api';

export default {
  namespace: 'userDetail',

  state: {
    data: {},
    logData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUserDtl, payload);
      yield put({
        type: 'setDetail',
        payload: { data: response },
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
        data: payload.data,
        // logData: payload.logData,
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
