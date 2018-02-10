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
      if(response.code === 0) {
        const data = response.data;
        obj.list = data.results;
        obj.pagination = {current: data.pagination.page, pageSize: data.pagination.page_num, total: data.pagination.total}
      }
      yield put({
        type: 'save',
        payload: { ...obj, isSearchPending: payload.isSearchPending },
      });
    },
  },

  reducers: {
    save(state, action) {
      console.log(11111111111)
      console.log(action.payload)
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
