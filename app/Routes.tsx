import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import routes from './constants/routes.json';
import HomePage from './containers/HomePage';

// Lazily load routes and code split with webpack
const LazyTestPage = React.lazy(() =>
  import(/* webpackChunkName: "TestPage" */ './containers/TestPage')
);

const TestPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyTestPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path={routes.TEST} component={TestPage} />
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </HashRouter>
    </>
  );
}
