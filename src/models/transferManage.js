import { queryTransfer, exportTransfer } from '../services/api';
import { downloadFile } from '../utils/utils';

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
    *exportSVG({ payload, callback }, { call, put }) {
      const response = yield call(exportTransfer, payload);
      downloadFile(response);
      if (callback) callback();
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
  },
};
