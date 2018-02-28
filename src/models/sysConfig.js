import { message } from 'antd';
import { fakeFee, fakeReleaseMsg, queryFee, queryMsg } from '../services/api';

export default {
  namespace: 'sysConfig',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    feeData: {}
  },

  effects: {
    *saveFee({ payload }, { call, put }) {
      const response = yield call(fakeFee, payload);
      if (response.code === 0) {
        message.success('保存成功');
      }
      yield put({
        type: 'fakeFee',
        payload,
      });
    },
    *releaseMsg({ payload, callback }, { call, put }) {
      const response = yield call(fakeReleaseMsg, payload);
      if (response.code === 0) {
        message.success('发布成功');
      }
      yield put({
        type: 'fakeSubmitForm',
        payload,
      });
      if (callback) callback();
    },
    *fetchFee({ payload }, { call, put }) {
      const response = yield call(queryFee, payload);
      yield put({
        type: 'getFee',
        payload: response,
      });
    },
    *fetchMsgList({ payload }, { call, put }) {
      const response = yield call(queryMsg, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    fakeFee(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    save(state, { payload }) {
      let { data: { results, pagination } } = payload || {};
      return {
        ...state,
        data: {
          list: results,
          pagination,
        },
      };
    },
    getFee(state, { payload }) {
      let { data } = payload || {};
      return {
        ...state,
        feeData: data,
      };
    },
  },
};
