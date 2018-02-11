import { queryUser } from '../services/api';

export default {
  namespace: 'userManage',

  state: {
    data: {
      list: [],
      pagination: {},
      isSearchPending: false,
    },
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
        payload: { ...obj, isSearchPending: payload.isSearchPending },
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
  },
};
