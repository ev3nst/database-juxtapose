import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { Ref } from 'semantic-ui-react';
import { initApp } from './redux/actions';
import { RootState } from './redux/store';
import routes from './utils/routes.json';
import {
  Intro,
  NavigationWrapper,
  DataStructures,
  NewMigration,
  Structure,
  MigrationWizard,
  Settings,
} from './containers';

import { NotificationContainer } from './components/Notification';

// #region Redux Configuration
const mapStateToProps = ({ intro }: RootState) => {
  const { loaded } = intro;
  return { loaded };
};

const mapActionsToProps = {
  initApp,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type IProps = ConnectedProps<typeof connector>;
// #endregion

// Component
class Routes extends React.Component<IProps> {
  contextRef!: React.Ref<HTMLElement>;

  constructor(props: IProps) {
    super(props);
    this.contextRef = React.createRef();
  }

  componentDidMount(): void {
    const { initApp: InitApp, loaded } = this.props;

    if (loaded === false) {
      InitApp();
    }
  }

  shouldComponentUpdate(nextProps: IProps): boolean {
    const { loaded } = this.props;
    if (loaded !== nextProps.loaded) {
      return true;
    }
    return false;
  }

  render() {
    const { loaded } = this.props;
    if (loaded === true) {
      return (
        <Ref innerRef={this.contextRef}>
          <>
            <NotificationContainer transitionDuration={200} />
            <Router>
              <Route path={routes.WRAPPER} component={NavigationWrapper} />
              <Switch>
                <Route path={routes.CONTENT_STRUCTURES} component={DataStructures} />
                <Route path={routes.NEW_MIGRATION} component={NewMigration} />
                <Route path={routes.NEW_STRUCTURE} component={Structure} />
                <Route path={routes.MIGRATION_WIZARD} component={MigrationWizard} />
                <Route path={routes.SETTINGS} component={Settings} />
                <Route path="*" component={DataStructures} />
              </Switch>
            </Router>
          </>
        </Ref>
      );
    }
    return <Intro />;
  }
}

export default connector(Routes);
