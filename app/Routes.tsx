import React from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import routes from './utils/routes.json';
import {
  Intro,
  NewMigration,
  NewStructure,
  MigrationWizard,
  Settings
} from './containers';

export default function Routes() {
  return (
      <Router>
        <Switch>
          <Route path={routes.INTRO} exact component={Intro} />
          <Route path={routes.NEW_MIGRATION} component={NewMigration} />
          <Route path={routes.NEW_STRUCTURE} component={NewStructure} />
          <Route path={routes.MIGRATION_WIZARD} component={MigrationWizard} />
          <Route path={routes.SETTINGS} component={Settings} />
          <Route path="*" component={Intro} />
        </Switch>
      </Router>
  );
}
