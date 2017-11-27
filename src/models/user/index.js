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
  },

  effects: {
    * getUserInfo({ payload: accesstoken }, { put, call }) {
      try {
        const user = yield call(checkAccessToken, accesstoken);
        yield put({ type: 'saveAccessToken', payload: accesstoken });
        yield put({ type: 'saveUserInfo', payload: user.data });
      } catch (err) {
      }
    },
  },

  reducers: {
    saveAccessToken(state, { payload: accesstoken }) {
      return { ...state, accesstoken };
    },
    saveUserInfo(state, { payload: { id, loginname, avatar_url } }) {
      return { ...state, id, loginname, avatar_url };
    },
  },
};
