import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/:type?" component={IndexPage} />
        <Redirect from="/" to="/all" />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
