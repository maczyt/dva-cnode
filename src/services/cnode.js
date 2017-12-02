import axios from '../utils/request';

let api = '/api';
if (API_ENV === 'prod') {
  api = 'https://cnodejs.org/api/v1';
}

export function fetchItems(type, page) {
  return axios.get(`${api}/topics?mdrender=false&tab=${type}&page=${page}`);
}

export function fetchItemsComments(ids) {
  return Promise.all(ids.map(id => fetchComments(id)));
}

export function fetchComments(id) {
  return fetchItem(id);
}

export function fetchItem(id) {
  return axios.get(`${api}/topic/${id}?mdrender=false`);
}

export function fetchCollect(username) {
  return axios.get(`${api}/topic_collect/${username}`);
}

// 新建主题
export function postItem(accesstoken, title, content) {
  const tab = 'dev'; // 由于cnode发帖规则，只能发送到dev
  return axios.post(`${api}/topics`, { accesstoken, title, content, tab });
}

// 编辑主题
// export function updateItem(accesstoken, topic_id, title, content) {
//  return fetch('/api/topics/update', { method: 'POST', body: { accesstoken, topic_id, title, content } });
// }

// 收藏主题
export function collectItem(accesstoken, topic_id) {
  return axios.post(`${api}/topic_collect/collect`, { accesstoken, topic_id });
}

// 取消收藏
export function deCollectItem(accesstoken, topic_id) {
  return axios.post(`${api}/topic_collect/de_collect`, { accesstoken, topic_id });
}

// 新建评论
export function reply(accesstoken, content, topic_id, reply_id = null) {
  return axios.post(`${api}/topic/${topic_id}/replies`, { accesstoken, content, reply_id });
}

// 点赞
export function starReply(accesstoken, reply_id) {
  return axios.post(`${api}/reply/${reply_id}/ups`, { accesstoken });
}

// 用户
export function userDetail(username) {
  return axios.get(`${api}/user/${username}`);
}
// 验证 accessToken 的正确性
export function checkAccessToken(accesstoken) {
  return axios.post(`${api}/accesstoken`, { accesstoken })
      .then(response => response)
      .catch(err => { throw err; });
}

// 消息通知
// export function noReadMessage(accesstoken) {
//   return fetch(`/api/message/count`)
// }
