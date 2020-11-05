import React from 'react';
import { NavbarProps, NavbarStates, RouteItem } from './types';
import { Menu, Icon, SemanticICONS } from 'semantic-ui-react';
import NavbarItem from './NavbarItem';
import NavDropdown from './NavDropdown';

type IProps = {
  navItems: Array<RouteItem>;
  showBackButton: Boolean;
  onNavigateBack?: () => void;
  backText?: string;
  backIcon?: SemanticICONS;
};

class Navbar extends React.PureComponent<NavbarProps & IProps, NavbarStates> {
  state: NavbarStates = {
    activeTab: this.props.activeNavbar,
  };

  renderBackButton(): JSX.Element {
    const { onNavigateBack, backText, backIcon } = this.props;
    return (
      <Menu.Item
        key="back"
        position="right"
        onClick={() => {
          onNavigateBack !== undefined
            ? onNavigateBack()
            : console.log('Should implement onNavigateBack prop.');
        }}
      >
        <Icon name={backIcon ?? 'remove'} />
        <span>{backText ?? 'Go Back'}</span>
      </Menu.Item>
    );
  }

  renderNavItems(items: Array<RouteItem>): Array<JSX.Element> {
    const { onMenuClick, activeNavbar, showBackButton } = this.props;
    const itemsToRender = items.map((item) => {
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

    if (showBackButton === true) {
      itemsToRender.push(this.renderBackButton());
    }
    return itemsToRender;
  }

  render() {
    const { navItems } = this.props;

    return <Menu>{this.renderNavItems(navItems)}</Menu>;
  }
}

export * from './types';
export default Navbar;
