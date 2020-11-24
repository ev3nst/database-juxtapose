import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { Ref } from 'semantic-ui-react';
import { initApp } from './redux/actions';
import { RootState } from './redux/store';
import {
  Intro,
  StickyNavigation,
  Structures,
  StructureDetail,
  Integrations,
  IntegrationDetail,
  Wizard,
  Settings,
} from './containers';

import { NotificationContainer } from './components/Notification';
import { ROUTES, DARK_MODE } from './utils/constants';

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
              <Route path={ROUTES.WRAPPER} component={StickyNavigation} />
              <Switch>
                <Route path={ROUTES.STRUCTURE} component={Structures} />
                <Route path={ROUTES.STRUCTURE_DETAIL} component={StructureDetail} />
                <Route path={ROUTES.INTEGRATION} component={Integrations} />
                <Route path={ROUTES.INTEGRATION_DETAIL} component={IntegrationDetail} />
                <Route path={ROUTES.WIZARD} component={Wizard} />
                <Route path={ROUTES.SETTINGS} component={Settings} />
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
