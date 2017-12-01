import pathToRegexp from 'path-to-regexp';

import { 
  fetchItems,
  fetchItem,
} from '../../services/cnode';

const ITEMS_TYPE = [
  'all', 'ask', 'share', 'job', 'good',
];

export default {
  namespace: 'item',

  state: {
    activeType: null,
    lists: {
      all: [],
      ask: [],
      share: [],
      job: [],
      good: [],
    },
    itemsById: {},
  },

  subscriptions: {
    listSubscribe({ dispatch, history }) {

      function fetchList(type, page = 1) {
        dispatch({ type: 'saveActiveType', payload: type });
        dispatch({ type: 'fetchList', payload: { type, page } });
      }

      return history.listen(({ pathname }) => {
        for (const type of ITEMS_TYPE) {
          const match = pathToRegexp(`/${type}/:page?`).exec(pathname);
          if (match) {
            const page = match[1];
            fetchList(type, page);
          }      
        }
      });
    },
  },

  effects: {
    * fetchList({ payload }, { put, call }) {
      const { type, page } = payload;
      const items = yield call(fetchItems, type, page);
      const ids = items.data.data.map(item => item.id);
      yield put({ type: 'saveList', payload: { ids, type } });
      yield put({ type: 'saveItems', payload: items.data.data });
    },
  },
  reducers: {
    saveList(state, { payload }) {
      const { ids, type } = payload;
      return { ...state, lists: { ...state.lists, [type]: ids } };
    },
    saveItems(state, { payload: itemsArr }) {
      const items = itemsArr.reduce((_memo, item) => {
        const memo = _memo;
        memo[item.id] = item;
        return memo;
      }, {});
      return { ...state, itemsById: { ...state.itemsById, ...items } };
    },
    saveActiveType(state, { payload: activeType }) {
      return { ...state, activeType };
    },
  },
};
