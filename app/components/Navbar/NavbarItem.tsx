import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { NavItemProps } from './types';

const styleOverrides: React.CSSProperties = {
  paddingRight: 30,
  paddingLeft: 30,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
};

class NavbarItem extends React.Component<NavItemProps> {
  shouldComponentUpdate(nextProps: NavItemProps) {
    const { item, activeNavbar } = this.props;
    if (nextProps.activeNavbar === item.route || activeNavbar === item.route) {
      return true;
    }
    return false;
  }

  render() {
    const { item, onMenuClick, activeNavbar } = this.props;
    return (
      <Menu.Item
        position={item.route === '/settings' ? 'right' : undefined}
        name={item.route}
        style={styleOverrides}
        active={activeNavbar === item.route}
        onClick={() => onMenuClick(item.route as string)}
      >
        {item.icon !== undefined && <Icon name={item.icon} />}
        <span>{item.title}</span>
      </Menu.Item>
    );
  }
}

export default NavbarItem;
