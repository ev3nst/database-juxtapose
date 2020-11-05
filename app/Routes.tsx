import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { initApp } from './redux/actions';
import { RootState } from './redux/store';
import routes from './utils/routes.json';
import {
  Intro,
  Wrapper,
  ContentStructures,
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
type IProps = ConnectedProps<typeof connector>;

type IStates = {};
//#endregion

// Component
class Routes extends React.Component<IProps, IStates> {
  componentDidMount() {
    if (this.props.loaded === false) {
      this.props.initApp();
    }
  }

  shouldComponentUpdate(nextProps: IProps) {
    if (this.props.loaded !== nextProps.loaded) {
      return true;
    }
    return false;
  }

  render() {
    if (this.props.loaded === true) {
      return (
        <React.Fragment>
          <Router>
            <Route path={routes.WRAPPER} component={Wrapper} />
            <Switch>
              <Route
                path={routes.CONTENT_STRUCTURES}
                component={ContentStructures}
              />
              <Route path={routes.NEW_MIGRATION} component={NewMigration} />
              <Route path={routes.NEW_STRUCTURE} component={Structure} />
              <Route
                path={routes.MIGRATION_WIZARD}
                component={MigrationWizard}
              />
              <Route path={routes.SETTINGS} component={Settings} />
              <Route path="*" component={ContentStructures} />
            </Switch>
          </Router>
        </React.Fragment>
      );
    } else {
      return <Intro />;
    }
  }
}

export default connector(Routes);
