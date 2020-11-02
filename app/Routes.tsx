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
  const {
    loading,
    loaded,
    paths,
    autoSave,
    errorState,
    errorMessage,
  } = settings;
  return { loading, loaded, paths, autoSave, errorState, errorMessage };
};

const mapActionsToProps = {
  initSettings,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type IRouteProps = ConnectedProps<typeof connector>;
//#endregion

// Component
class Routes extends Component<IRouteProps> {
  componentDidMount() {
    if (this.props.loaded === false) {
      this.props.initSettings();
    }
  }

  render() {
    console.log(this.props)

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
