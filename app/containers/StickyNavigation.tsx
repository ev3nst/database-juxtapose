import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Sticky } from 'semantic-ui-react';
import { ROUTES, DARK_MODE, NavbarItems } from '../utils/constants';
import { Navbar, AppActions } from '../components';

// #region Redux Configuration
type IProps = {
  contextRef: React.Ref<HTMLElement>;
} & RouteComponentProps;

type IStates = {
  activeContainer: string;
};
// #endregion

// Component
class StickyNavigation extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      activeContainer: ROUTES.STRUCTURES,
    };
  }

  componentDidMount() {
    const { location, history } = this.props;
    const { activeContainer } = this.state;

    if (
      location.pathname === '/' ||
      Object.values(ROUTES).indexOf(location.pathname) === -1
    ) {
      this.setState({
        activeContainer: ROUTES.STRUCTURES,
      });
      history.push(ROUTES.STRUCTURES);
    } else if (activeContainer !== location.pathname) {
      this.setState({
        activeContainer: location.pathname,
      });
    }
  }

  shouldComponentUpdate(_nextProps: IProps, prevState: IStates) {
    const { activeContainer } = this.state;
    if (activeContainer !== prevState.activeContainer) {
      return true;
    }
    return false;
  }

  onNavigate = (container: string) => {
    const { activeContainer } = this.state;

    if (activeContainer !== container) {
      const { history } = this.props;
      this.setState({
        activeContainer: container,
      });
      history.push(container);
    }
  };

  render() {
    const { contextRef } = this.props;
    const { activeContainer } = this.state;
    return (
      <Sticky context={contextRef}>
        <AppActions />
        <Navbar
          inverted={DARK_MODE}
          navItems={NavbarItems}
          activeNavbar={activeContainer}
          onMenuClick={this.onNavigate}
        />
      </Sticky>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(StickyNavigation);
