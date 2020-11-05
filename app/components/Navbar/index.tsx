import React from 'react';
import { NavbarProps, NavbarStates, RouteItem } from './types';
import { Menu } from 'semantic-ui-react';
import NavbarItem from './NavbarItem';
import NavDropdown from './NavDropdown';

type IProps = {
  navItems: Array<RouteItem>;
};

class Navbar extends React.PureComponent<NavbarProps & IProps, NavbarStates> {
  state: NavbarStates = {
    activeTab: this.props.activeNavbar,
  };

  renderNavItems(items: Array<RouteItem>): Array<JSX.Element> {
    const { onMenuClick, activeNavbar } = this.props;
    return items.map((item) => {
      const key = item.title;
      if (item.dropdown !== undefined && item.dropdown === true) {
        return <NavDropdown key={key} item={item} onMenuClick={onMenuClick} />;
      } else {
        return (
          <NavbarItem
            key={key}
            item={item}
            onMenuClick={onMenuClick}
            activeNavbar={activeNavbar}
          />
        );
      }
    });
  }

  render() {
    const { navItems } = this.props;

    return <Menu>{this.renderNavItems(navItems)}</Menu>;
  }
}

export * from './types';
export default Navbar;
