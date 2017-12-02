import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ItemPage from './routes/ItemPage';
import Login from './routes/Login';
import Layout from './components/layout';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/item/:itemId" exact component={ItemPage} />
          <Route path="/:type/:page?" component={IndexPage} />
          <Redirect from="/" to="/all" />
        </Switch>
      </Layout>
    </Router>
  );
}

export default RouterConfig;
