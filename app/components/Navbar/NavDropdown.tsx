import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import NavDropdownItem from './NavDropdownItem';
import { NavDropdownProps, NavDropdownStates, RouteItem } from './types';

class NavDropdown extends React.Component<NavDropdownProps, NavDropdownStates> {
  shouldComponentUpdate() {
    return false;
  }

  renderItems(items: Array<RouteItem>): JSX.Element[] {
    const { onMenuClick } = this.props;
    return items.map((item) => (
      <NavDropdownItem key={item.title} item={item} onMenuClick={onMenuClick} />
    ));
  }

  render() {
    const { item } = this.props;
    return (
      <Dropdown item icon="add">
        <Dropdown.Menu>
          <Dropdown.Header>{item.title}</Dropdown.Header>
          {item.items !== undefined && this.renderItems(item.items)}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default NavDropdown;
