import { queryTransfer, queryPendingTransferCount, transferExportToCSV } from '../services/api';

export default {
  namespace: 'transferManage',

  state: {
    data: {
      list: [],
      pagination: {},
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
    save(state, action) {
      return {
        ...state,
        data: action.payload,
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
