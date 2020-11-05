import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import routes from '../utils/routes.json';
import { NavbarItems } from '../utils/constants';
import Navbar from '../components/Navbar';

//#region Redux Configuration
type IProps = {} & RouteComponentProps;

type IStates = {
  activeContainer: string;
};
//#endregion

// Component
class Wrapper extends React.Component<IProps, IStates> {
  state: IStates = {
    activeContainer: routes.CONTENT_STRUCTURES,
  };

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

  shouldComponentUpdate(_nextProps: IProps, prevState: IStates) {
    if (this.state.activeContainer !== prevState.activeContainer) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    const { location } = this.props;
    const { activeContainer } = this.state;

    if (
      location.pathname === '/' ||
      Object.values(routes).indexOf(location.pathname) === -1
    ) {
      this.onNavigate(routes.CONTENT_STRUCTURES);
    } else if (activeContainer !== location.pathname) {
      this.setState({
        activeContainer: location.pathname,
      });
    }
  }

  render() {
    console.log('WRAPPER RENDERED');
    const { activeContainer } = this.state;
    return (
      <Navbar
        navItems={NavbarItems}
        activeNavbar={activeContainer}
        onMenuClick={this.onNavigate}
        onNavigateBack={() => this.onNavigate(routes.CONTENT_STRUCTURES)}
        showBackButton={activeContainer !== routes.CONTENT_STRUCTURES}
      />
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Wrapper);
