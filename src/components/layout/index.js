import React from 'react';
import NProgress from 'nprogress';
import { connect } from 'dva';
import 'nprogress/nprogress.css';

let lastHref;
const mapStateToProps = ({ loading }) => {
  return { loading };
};

export default connect(mapStateToProps)(({ children, loading }) => {
  const href = window.location.href;
  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
    }
    lastHref = href;
  }
  return (
    <div>
      {children}
    </div>
  );
});
