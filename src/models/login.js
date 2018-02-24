import { stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { fakeAccountLogin, getCaptcha } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import CONFIG from '../utils/config';

export default {
  namespace: 'login',

  state: {
    code: undefined,
  },

  effects: {
    *getCaptcha({ payload }, { call, put }) {
      // const response = yield call(getCaptcha, payload);
      let postUrl = `/btcm/admin/captcha?${stringify(payload)}`;
      yield put({
        type: 'changeCaptcha',
        payload: __PROD__ ? CONFIG.base_url + postUrl : postUrl
      });
    },
    *login({ payload }, { call, put }) {
      let response = yield call(fakeAccountLogin, payload);
      if (response.code === 0) {
        response.data.currentAuthority = 'admin';
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.code === 0) {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      } else {
        // 调用getCaptcha
        yield put({ type: 'getCaptcha', payload: { r: Math.random() } });
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            code: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data);
      return {
        ...state,
        code: payload.code,
        msg: payload.msg
        // type: payload.type,
      };
    },
    changeCaptcha(state, { payload }) {
      return {
        ...state,
        image: payload,
      };
    },
  },
};
