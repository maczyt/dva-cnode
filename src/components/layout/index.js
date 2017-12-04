import React from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

let lastHref;

const Layout = ({ children }) => {
  const href = window.location.href;
  if (lastHref !== href) {
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
      lastHref = href;
    }, 1500);
  }
  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;
