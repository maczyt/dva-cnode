export default {
  namespace: 'system',

  state: {
    error: false,
    errorMsg: null,
  },

  reducers: {
    error(state, { payload: errorMsg }) {
      const error = true;
      return { ...state, errorMsg, error };
    },
    ok(state) {
      const errorMsg = null;
      const error = false;
      return { ...state, error, errorMsg };
    },
  },

};
