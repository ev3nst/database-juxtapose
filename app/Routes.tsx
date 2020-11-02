import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { initSettings } from './redux/actions';
import { RootState } from './redux/store';
import routes from './utils/routes.json';
import {
  Intro,
  NewMigration,
  Structure,
  MigrationWizard,
  Settings,
} from './containers';

//#region Redux Configuration
const mapStateToProps = ({ settings }: RootState) => {
  const { loading, paths } = settings;
  return {
    loading,
    paths,
  };
};

const mapActionsToProps = {
  initSettings,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
//#endregion

// Component
class Routes extends Component<PropsFromRedux> {
  componentDidMount() {
    if (this.props.loading === true) {
      this.props.initSettings();
    }
  }

  render() {
    if (this.props.loading === true) {
      return (
        <div>
          <h1>LOADING !!</h1>
        </div>
      );
    }

    return (
      <Router>
        <Switch>
          <Route path={routes.INTRO} exact component={Intro} />
          <Route path={routes.NEW_MIGRATION} component={NewMigration} />
          <Route path={routes.STRUCTURE} component={Structure} />
          <Route path={routes.MIGRATION_WIZARD} component={MigrationWizard} />
          <Route path={routes.SETTINGS} component={Settings} />
          <Route path="*" component={Intro} />
        </Switch>
      </Router>
    );
  }
}

export default connector(Routes);
