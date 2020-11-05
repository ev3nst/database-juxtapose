import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { NavItemProps } from './types';

class NavbarItem extends React.Component<NavItemProps> {
  shouldComponentUpdate(nextProps: NavItemProps) {
    if (
      nextProps.activeNavbar == this.props.item.route ||
      this.props.activeNavbar == this.props.item.route
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { item, onMenuClick, activeNavbar } = this.props;
    return (
      <Menu.Item
        name={item.route}
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
