import { fakeFroget } from '../services/api';

export default {
  namespace: 'forget',

  state: {
    status: undefined,
  },

  effects: {
    *submit(_, { call, put }) {
      const response = yield call(fakeFroget);
      yield put({
        type: 'forgetHandle',
        payload: response,
      });
    },
  },

  reducers: {
    forgetHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
