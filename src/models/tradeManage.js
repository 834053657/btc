import { queryTrade, removeTrade, addTrade, exportTrade } from '../services/api';
import { downloadFile } from '../utils/utils';

export default {
  namespace: 'tradeManage',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTrade, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addTrade, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeTrade, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *exportSVG({ payload, callback }, { call, put }) {
      const response = yield call(exportTrade, payload);
      downloadFile(response);
      if (callback) callback();
    }
  },

  reducers: {
    save(state, { payload }) {
      let { data: { results, pagination, complaint_count = 0 } } = payload || {};
      return {
        ...state,
        data: {
          list: results,
          pagination,
          complaint_count
        },
      };
    },
  },
};
