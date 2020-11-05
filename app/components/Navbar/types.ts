import { SemanticICONS } from 'semantic-ui-react';

export type RouteItem = {
  title: string;
  route?: string;
  icon?: SemanticICONS;
  dropdown?: Boolean;
  items?: Array<RouteItem>;
};

//#region Navbar Item
export type NavbarProps = {
  onMenuClick: (title: string) => void;
  activeNavbar: string;
};

export type NavbarStates = {
  activeTab: string;
};
//#endregion

//#region Navbar Item
export type NavItemProps = {
  item: RouteItem;
} & NavbarProps;

export type NavItemStates = {};
//#endregion

//#region Navbar Dropdown
export type NavDropdownProps = {
  item: RouteItem;
  onMenuClick: (title: string) => void;
};

export type NavDropdownStates = {};
//#endregion

//#region Navbar Dropdown Item
export type NavDropdownItemProps = {
  item: RouteItem;
};

export type NavDropdownItemStates = {};
//#endregion
