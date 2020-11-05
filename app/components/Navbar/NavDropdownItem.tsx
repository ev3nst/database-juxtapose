import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import { NavDropdownItemProps, NavDropdownItemStates } from './types';

class NavDropdownItem extends React.Component<
  NavDropdownItemProps,
  NavDropdownItemStates
> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { item, onMenuClick } = this.props;
    return (
      <Dropdown.Item onClick={() => onMenuClick(item.route as string)}>
        {item.icon !== undefined && <Icon name={item.icon} />}
        <span>{item.title}</span>
      </Dropdown.Item>
    );
  }
}

export default NavDropdownItem;
