import { queryAd, cancelAd, queryAdRpt } from '../services/api';

export default {
  namespace: 'adManage',

  state: {
    data: {
      list: [],
      reporting_count: 0,
      pagination: {},
    },
    rptData: {
      list: [],
      pagination: {},
    }
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
      yield put({ type: 'fetchRpt', payload: {} });
      if (callback) callback();
    },
    *fetchRpt({ payload }, { call, put }) {
      const response = yield call(queryAdRpt, payload);
      yield put({
        type: 'saveRpt',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      let { data: { results, pagination, reporting_count } } = payload || {};
      return {
        ...state,
        data: {
          list: results,
          reporting_count,
          pagination
        },
      };
    },
    saveRpt(state, { payload }) {
      let { data: { results, pagination } } = payload || {};
      return {
        ...state,
        rptData: {
          list: results,
          pagination
        },
      };
    },
  },
};
