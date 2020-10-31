import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { initializeSettings } from './redux/actions';
import { SettingPathInterface } from './types/settings.types';
import { RootState } from './redux/store';
import routes from './utils/routes.json';
import {
  Intro,
  NewMigration,
  NewStructure,
  MigrationWizard,
  Settings,
} from './containers';

interface IMapStateToProps {
  paths: SettingPathInterface;
  loading: Boolean;
}

interface IMapDispatchToProps {
  initializeSettings: typeof initializeSettings;
}

type RouterProps = RouteComponentProps & IMapStateToProps & IMapDispatchToProps;

class Routes extends Component<RouterProps> {
  componentDidMount() {
    if(this.props.loading === true) {
      this.props.initializeSettings(this.props.history);
    }
  }

  render() {
    if(this.props.loading === true) {
      return (
        <div>
          <h1>LOADING !!</h1>
        </div>
      )
    }

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
}

const mapStateToProps = ({ settings }: RootState) => {
  const { loading, paths } = settings;
  return {
    loading,
    paths,
  };
};

const mapActionsToProps = {
  initializeSettings,
};

export default connect<
  IMapStateToProps,
  IMapDispatchToProps,
  RouterProps,
  RootState
>(
  mapStateToProps,
  mapActionsToProps
)(Routes);
