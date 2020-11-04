import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { initApp } from './redux/actions';
import { RootState } from './redux/store';
import routes from './utils/routes.json';
import {
  Intro,
  Home,
  NewMigration,
  Structure,
  MigrationWizard,
  Settings,
} from './containers';

//#region Redux Configuration
const mapStateToProps = ({ intro }: RootState) => {
  const { loaded } = intro;
  return { loaded };
};

const mapActionsToProps = {
  initApp,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type IRouteProps = ConnectedProps<typeof connector>;
//#endregion

// Component
class Routes extends Component<IRouteProps> {
  componentDidMount() {
    if (this.props.loaded === false) {
      this.props.initApp();
    }
  }

  render() {
    if (this.props.loaded === true) {
      return (
        <Router>
          <Switch>
            <Route path={routes.INTRO} exact component={Home} />
            <Route path={routes.NEW_MIGRATION} component={NewMigration} />
            <Route path={routes.STRUCTURE} component={Structure} />
            <Route path={routes.MIGRATION_WIZARD} component={MigrationWizard} />
            <Route path={routes.SETTINGS} component={Settings} />
            <Route path="*" component={Home} />
          </Switch>
        </Router>
      );
    }

    return <Intro />;
  }
}

export default connector(Routes);
