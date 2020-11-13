import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { Ref } from 'semantic-ui-react';
import { initApp } from './redux/actions';
import { RootState } from './redux/store';
import routes from './utils/routes.json';
import {
  Intro,
  StickyNavigation,
  Structure,
  Migration,
  Wizard,
  Settings,
} from './containers';

import { NotificationContainer } from './components/Notification';
import { DARK_MODE } from './utils/constants';

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
          <div
            className={DARK_MODE === true ? 'route-wrapper inverted' : 'route-wrapper'}
          >
            <NotificationContainer transitionDuration={200} />
            <Router>
              <Route path={routes.WRAPPER} component={StickyNavigation} />
              <Switch>
                <Route path={routes.STRUCTURE} component={Structure} />
                <Route path={routes.MIGRATION} component={Migration} />
                <Route path={routes.WIZARD} component={Wizard} />
                <Route path={routes.SETTINGS} component={Settings} />
              </Switch>
            </Router>
          </div>
        </Ref>
      );
    }
    return <Intro />;
  }
}

export default connector(Routes);
