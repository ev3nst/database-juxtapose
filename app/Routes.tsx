import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import routes from './utils/routes.json';
import Intro from './containers/Intro';

export default function Routes() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path={routes.INTRO} component={Intro} />
        </Switch>
      </HashRouter>
    </>
  );
}
