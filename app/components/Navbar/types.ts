import { SemanticICONS } from 'semantic-ui-react';

export type RouteItem = {
  title: string;
  route?: string;
  icon?: SemanticICONS;
  dropdown?: boolean;
  items?: Array<RouteItem>;
};

// #region Navbar Item
export type NavbarProps = {
  /** Callback when clicked on Navbar Item. */
  onMenuClick: (title: string) => void;

  /** Active Navbar state. */
  activeNavbar: string;

  /** Navigation Items */
  navItems: Array<RouteItem>;

  /** Show Back Button state. */
  showBackButton: boolean;

  /** Callback when clicked on Back Button. */
  onNavigateBack?: () => void;

  /** Optional Back Button Text. */
  backText?: string;

  /** Optional Back Button Icon. */
  backIcon?: SemanticICONS;
};
// #endregion

// #region Navbar Item
export type NavItemProps = {
  item: RouteItem;
  onMenuClick: (title: string) => void;
  activeNavbar: string;
};

export type NavItemStates = {};
// #endregion

// #region Navbar Dropdown
export type NavDropdownProps = {
  item: RouteItem;
  onMenuClick: (title: string) => void;
};

export type NavDropdownStates = {};
// #endregion

// #region Navbar Dropdown Item
export type NavDropdownItemProps = {
  item: RouteItem;
  onMenuClick: (title: string) => void;
};

export type NavDropdownItemStates = {};
// #endregion
