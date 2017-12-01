export function listSelector(state) {
  const { item: { activeType, lists, itemsById } } = state;
  const _memo = lists[activeType];
  const memo = _memo.map(m => itemsById[m]);
  return memo;
}
