const { expect } = require('chai');
const {
  checkAccessToken,
  fetchIdsByType,
  postItem,
} = require('../../services/cnode');

const accesstoken = '';

describe('check access token', function() {
  it('should come back object', function() {
    checkAccessToken(accesstoken)
      .then(response => response.data)
      .then(data => {
        expect(data).to.include.keys('id');
      });
  });
});

describe('fetch lists', function() {
  it('fetch \'ask\'', function() {
    fetchIdsByType('ask')
      .then(response => response.data)
      .then(data => {
        const a = data.data[0];
        expect(a.tab).to.equal('ask');
      });
  });
  it('fetch \'all\'', function() {
    fetchIdsByType('all')
      .then(response => response.data)
      .then(data => {
        console.log(data.data.length);
      });
  });
});

describe('新建主题', function() {
  it('should return an object, success: true', function() {
    postItem(accesstoken, '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', '测试测试测试测试测试测试测试测试测试测试测试测试测试这是测试内容')
      .then(response => response.data)
      .then(data => {
        expect(data.success).to.be.ok;
      })
      .catch(err => err.response.data)
      .then(data => {
        expect(data.success).to.be.ok;
      });
  });
});

