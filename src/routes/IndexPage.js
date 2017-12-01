import React from 'react';
import { connect } from 'dva';
import { Redirect, routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import ItemList from '../components/ItemList';

import styles from './IndexPage.less';

const TAB_TYPES = ['all', 'ask', 'share', 'job', 'good'];

function IndexPage({ dispatch, accesstoken, location, activeType }) {
  function changeType(type) {
    if (type === activeType) return;
    dispatch(routerRedux.replace({
      pathname: `/${type}`,
      state: { from: location },
    }));
  }
  function logout() {
    dispatch({ type: 'user/logout' });
  }
  return (
    accesstoken ?
      <div className={styles.wrapper}>
        <NavBar mode="dark" rightContent={[<Icon key="0" type="ellipsis" onClick={logout} />]}>CNODE</NavBar>
        <div className={styles.main}>
          <ItemList />
        </div>
        <nav className={styles.nav}>
          <ul>
            {TAB_TYPES.map(type =>
              <li key={type}>
                <a className={activeType === type ? styles.active : ''} onClick={changeType.bind(this, type)}>{type}</a>
              </li>
            )}
          </ul>
        </nav>
      </div> :
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
  );
}

IndexPage.propTypes = {
};

const mapStateToProps = ({ user: { accesstoken }, item: { activeType } }) => {
  return { accesstoken, activeType };
};

export default connect(mapStateToProps)(IndexPage);
