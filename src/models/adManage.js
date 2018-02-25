import { queryAd, cancelAd } from '../services/api';

export default {
  namespace: 'adManage',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAd, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *cancel({ payload, callback }, { call, put }) {
      const response = yield call(cancelAd, payload);
      yield put({ type: 'fetch', payload: {} });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, { payload }) {
      let { data: { results, pagination } } = payload || {};
      return {
        ...state,
        data: {
          list: results,
          pagination
        },
      };
    },
  },
};
