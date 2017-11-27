import React from 'react';
import { connect } from 'dva';

function IndexPage({ dispatch }) {
  return (
    <div>
      <button onClick={() => { dispatch({ type: 'user/getUserInfo', payload: '7bb73eb6-a2c2-4157-9b9c-9424923eea01' }); }}>
        Click Me
      </button>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
