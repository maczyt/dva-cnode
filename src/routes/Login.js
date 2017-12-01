import React from 'react';
import { List, InputItem, WhiteSpace, Button, Toast } from 'antd-mobile';
import { connect } from 'dva';
import styles from './Login.less';

function Login({ dispatch, logining, error, errorMsg }) {
  let accesstoken = '';
  function handleChange(val) {
    accesstoken = val.trim();
  }
  function submit() {
    dispatch({ type: 'user/getUserInfo', payload: accesstoken });
  }
  return (
    <div className={styles.login}>
      <div className="error">
        {error && Toast.fail(errorMsg, 2)}
      </div>
      <img className={styles.logo} src="https://cnodejs.org/public/images/cnodejs.svg" alt="cnode logo" />
      <List>
        <InputItem
          clear
          placeholder="cnode token"
          onChange={handleChange}
        >
          Token
        </InputItem>
        <WhiteSpace />
        <List.Item>
          <Button loading={logining} disabled={logining} type="primary" onClick={submit}>登录</Button>
        </List.Item>
      </List>
    </div>
  );
}

const mapStateToProps = ({ user: { logining }, system: { error, errorMsg } }) => {
  return { logining, error, errorMsg };
};

export default connect(mapStateToProps)(Login);
