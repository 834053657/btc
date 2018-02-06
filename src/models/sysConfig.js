import { message } from 'antd';
import { fakeSubmitForm, fakeSubmitFormMsg } from '../services/api';

export default {
  namespace: 'sysConfig',

  state: {},

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
  },

  reducers: {
    fakeSubmitForm(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
