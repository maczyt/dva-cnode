import { routerRedux } from 'dva/router';
import {
  checkAccessToken,
} from '../../services/cnode';

export default {
  namespace: 'user',

  state: {
    loginname: null,
    id: null,
    avatar_url: null,
    accesstoken: null,
    logining: false,
  },

  effects: {
    * getUserInfo({ payload: accesstoken }, { put, call }) {
      try {
        yield put({ type: 'toggleLogin' });
        const user = yield call(checkAccessToken, accesstoken);
        yield put({ type: 'saveAccessToken', payload: accesstoken });
        yield put({ type: 'saveUserInfo', payload: user.data });
        yield put({ type: 'system/ok' });
        yield put(routerRedux.push('/'));
      } catch (err) {
        yield put({ type: 'system/error', payload: '登录失败' });
      } finally {
        yield put({ type: 'toggleLogin' });
      }
    },
    * logout({}, { put }) {
      yield put({ type: 'removeUserInfo' });
      yield put(routerRedux.replace('/login'));
    },
  },

  reducers: {
    saveAccessToken(state, { payload: accesstoken }) {
      return { ...state, accesstoken };
    },
    saveUserInfo(state, { payload: { id, loginname, avatar_url } }) {
      return { ...state, id, loginname, avatar_url };
    },
    toggleLogin(state) {
      const logining = !state.logining;
      return { ...state, logining };
    },
    removeUserInfo(state) {
      const userInfo = {
        loginname: null,
        id: null,
        avatar_url: null,
        accesstoken: null,
      };
      return { ...state, ...userInfo };
    },
  },
};
