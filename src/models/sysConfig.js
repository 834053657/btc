import { message } from 'antd';
import { fakeSubmitForm, fakeSubmitFormMsg, queryUser } from '../services/api';

export default {
  namespace: 'sysConfig',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *submitForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      message.success('保存成功');
      yield put({
        type: 'fakeSubmitForm',
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
        payload: { ...obj, isSearchPending: payload.isSearchPending },
      });
    },
  },

  reducers: {
    fakeSubmitForm(state, action) {
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
  },
};
