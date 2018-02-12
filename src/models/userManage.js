import { queryUser, queryPendingUserCount } from '../services/api';

export default {
  namespace: 'userManage',

  state: {
    data: {
      list: [],
      pagination: {},
      isSearchPending: false,
    },
    pendingData: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
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
    *fetchPendingCount({ payload }, { call, put }) {
      const response = yield call(queryPendingUserCount, payload);
      yield put({
        type: 'savePendingCount',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    savePendingCount(state, action) {
      return {
        ...state,
        pendingData: action.payload,
      };
    },
  },
};
