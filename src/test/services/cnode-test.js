const { expect } = require('chai');
const {
  checkAccessToken,
  fetchIdsByType,
} = require('../../services/cnode');

const accesstoken = '7bb73eb6-a2c2-4157-9b9c-9424923eea01';

describe('check access token', function() {
  it('should come back object', function() {
    checkAccessToken(accesstoken)
      .then(response => response.data)
      .then(data => {
        expect(data).to.include.keys('id');
      })
      .catch(err => log(err));
  });
});

describe('fetch lists', function() {

});
