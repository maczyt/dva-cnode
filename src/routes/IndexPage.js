import React from 'react';
import { connect } from 'dva';
import { Redirect, routerRedux } from 'dva/router';
import { NavBar, Icon, Pagination } from 'antd-mobile';
import ItemList from '../components/ItemList';

import styles from './IndexPage.less';

const TAB_TYPES = ['all', 'ask', 'share', 'job', 'good'];

function IndexPage({ dispatch, accesstoken, location, match, activeType }) {
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
  function changePage(p) {
    const { params: { type } } = match;
    dispatch(routerRedux.push(`/${type}/${p}`));
  }
  const { params: { page = 1 } } = match;
  return (
    accesstoken ?
      <div className={styles.wrapper}>
        <NavBar mode="dark" rightContent={[<Icon key="0" type="ellipsis" onClick={logout} />]}>CNODE</NavBar>
        <div className={styles.main}>
          <ItemList />
          <div className={styles.pagination}>
            <Pagination simple total={99} onChange={changePage} current={page} locale={{ prevText: '上一页', nextText: '下一页' }} />
          </div>
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
