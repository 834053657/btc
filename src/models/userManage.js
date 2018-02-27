import { queryUser, queryPendingUserCount } from '../services/api';

export default {
  namespace: 'userManage',

  state: {
    data: {
      list: [],
      pagination: {},
      isSearchPending: false,
    },
    pendingData: {
      auth_count: 0
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUser, payload);
      /* let obj = {};
      if (response.code === 0) {
        const { data: { results, pagination } } = response;
        obj.list = results;
        obj.pagination = { current: pagination.page, pageSize: pagination.page_num, total: pagination.total };
      } */
      yield put({
        type: 'save',
        payload: response,
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
    savePendingCount(state, { payload }) {
      let { data: { auth_count = 0 } } = payload || {};
      return {
        ...state,
        pendingData: {
          auth_count
        }
      };
    },
  },
};
