import { queryAdDtl, queryAdOrders } from '../services/api';

export default {
  namespace: 'adDetail',

  state: {
    info: {},
    orderList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAdDtl, payload);
      yield put({
        type: 'saveInfo',
        payload: response,
      });
    },
    *fetchOrders({ payload }, { call, put }) {
      const response = yield call(queryAdOrders, payload);
      yield put({
        type: 'saveOrders',
        payload: response,
      });
    },
  },

  reducers: {
    saveInfo(state, { payload }) {
      return {
        ...state,
        info: payload.data || {},
      };
    },
    saveOrders(state, { payload }) {
      return {
        ...state,
        orderList: payload.data || [],
      };
    },
  },
};
