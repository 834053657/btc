import { message } from 'antd';
import { fakeFee, fakeSubmitFormMsg, queryFee, queryUser } from '../services/api';

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
      yield call(fakeFee, payload);
      message.success('保存成功');
      yield put({
        type: 'fakeFee',
        payload,
      });
    },
    *submitFormMsg({ payload }, { call, put }) {
      yield call(fakeSubmitFormMsg, payload);
      message.success('发送成功');
      yield put({
        type: 'fakeSubmitForm',
        payload,
      });
    },
    *fetchFee({ payload }, { call, put }) {
      const response = yield call(queryFee, payload);
      yield put({
        type: 'getFee',
        payload: response,
      });
    },
    *fetchMsgList({ payload }, { call, put }) {
      const response = yield call(queryUser, payload);
      let obj = {};
      if (response.code === 0) {
        const { data: { results, pagination } } = response;
        obj.list = results;
        obj.pagination = { current: pagination.page, pageSize: pagination.page_num, total: pagination.total };
      }
      yield put({
        type: 'save',
        payload: obj,
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
    save(state, action) {
      return {
        ...state,
        data: action.payload,
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
