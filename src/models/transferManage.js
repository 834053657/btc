import { queryTransfer, queryPendingTransferCount, transferExportToCSV } from '../services/api';

export default {
  namespace: 'transferManage',

  state: {
    data: {
      list: [],
      pagination: {},
      need_audit_count: 0
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTransfer, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchPendingCount({ payload, callback }, { call, put }) {
      const response = yield call(queryPendingTransferCount, payload);
      yield put({
        type: 'setPendingCount',
        payload: response,
      });
      if (callback) callback();
    },
    *exportToCSV({ payload }, { call, put }) {
      const response = yield call(transferExportToCSV, payload);
      yield put({
        type: 'setCSVData',
        payload: response,
      });
    }
  },

  reducers: {
    save(state, { payload }) {
      let { data: { results, pagination, need_audit_count = 0 } } = payload || {};
      return {
        ...state,
        data: {
          list: results,
          pagination,
          need_audit_count
        },
      };
    },
    setPendingCount(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        count: payload && payload.count,
      };
    },
    setCSVData(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        csvData: payload.list
      };
    }
  },
};
