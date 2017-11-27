import { 
  fetchIdsByType,
  fetchItem
} from '../../services/cnode';

const ITEMS_TYPE = [
  'all', 'ask', 'share', 'job', 'good',
];

export default {
  namespace: 'item',

  state: {
    activeType: null,
    itemsPerPage: 20,
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
      return history.listen(({ pathname }) => {
        for (const type of ITEMS_TYPE) {
          // console.log(type);
        }
      });
    },
  },

  effects: {

  },
  reducers: {
    saveItems(state, { payload }) {

    },
  },
};
