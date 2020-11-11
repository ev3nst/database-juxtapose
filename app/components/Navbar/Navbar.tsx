import React from 'react';
import { Menu, Icon, SemanticWIDTHS } from 'semantic-ui-react';
import { NavbarProps, RouteItem } from './types';
import NavbarItem from './NavbarItem';
import NavDropdown from './NavDropdown';

class Navbar extends React.PureComponent<NavbarProps> {
  menuCssOverrides: React.CSSProperties;

  constructor(props: NavbarProps) {
    super(props);

    this.menuCssOverrides = {
      marginTop: 0,
      marginBottom: 0,
      borderRadius: 0,
      borderBottomColor: '#ffffff14',
      borderBottomWidth: props.inverted === true ? 1 : 0,
    };
  }

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

  renderNavItems(items: Array<RouteItem>): JSX.Element[] {
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

  render(): JSX.Element {
    const { navItems, inverted } = this.props;

    return (
      <Menu
        pointing
        inverted={inverted}
        widths={navItems.length as SemanticWIDTHS}
        style={this.menuCssOverrides}
      >
        {this.renderNavItems(navItems)}
      </Menu>
    );
  }
}

export default Navbar;
