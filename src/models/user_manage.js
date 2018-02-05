import { queryUser} from '../services/api';

export default {
  namespace: 'user_manage',

  state: {
    data: {
      list: [],
      pagination: {},
      isSearchPending: false
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUser, payload);
      yield put({
        type: 'save',
        payload: {...response, isSearchPending: payload.isSearchPending}
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
