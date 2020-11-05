import React from 'react';
import { Menu, Icon, SemanticICONS } from 'semantic-ui-react';
import { NavbarProps, RouteItem } from './types';
import NavbarItem from './NavbarItem';
import NavDropdown from './NavDropdown';

type IProps = {
  navItems: Array<RouteItem>;
  showBackButton: boolean;
  onNavigateBack?: () => void;
  backText?: string;
  backIcon?: SemanticICONS;
} & NavbarProps;

class Navbar extends React.PureComponent<IProps> {
  renderBackButton(): JSX.Element {
    const { onNavigateBack, backText, backIcon } = this.props;
    return (
      <Menu.Item
        key="back"
        position="right"
        onClick={() => {
          if (onNavigateBack !== undefined) {
            onNavigateBack();
          }
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
      }
      return (
        <NavbarItem
          key={key}
          item={item}
          onMenuClick={onMenuClick}
          activeNavbar={activeNavbar}
        />
      );
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
