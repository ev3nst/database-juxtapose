import { CSSProperties } from 'react';
import { remote } from 'electron';
import { SemanticCOLORS } from 'semantic-ui-react';
import { RouteItem } from '../components/Navbar';
import {
  Initializes,
  IntegrationObject,
  PageError,
  PageLoading,
  StructureObject,
} from '../types';

export const WINDOW = remote.getCurrentWindow();
export const APP_NAME = remote.app.getName();
export const DARK_MODE = window.localStorage.getItem('dark_mode') === 'on';
export const PAGINATION_LIMIT = 10;

export const FOLDER_PREFIX = `/${APP_NAME}/`;
export const USER_FOLDER = remote.app.getPath('documents') + FOLDER_PREFIX;
export const CONFIG_PATH = `${USER_FOLDER}settings.json`;

export const STRUCTURE_AUTOSAVE_NAME = 'structure_autosave';
export const STRUCTURE_AUTOSAVE_FILE = `${STRUCTURE_AUTOSAVE_NAME}.json`;
export const EMPTY_STRUCTURE: StructureObject = {
  name: 'Autosave',
  description: '',
  structure: [],
};

export const INTEGRATION_AUTOSAVE_NAME = 'integration_autosave';
export const INTEGRATION_AUTOSAVE_FILE = `${INTEGRATION_AUTOSAVE_NAME}.json`;
export const EMPTY_INTEGRATION: IntegrationObject = {
  name: 'Autosave',
  description: '',
};

export const defaultConfig = {
  autoSave: true,
  paths: {
    userSettings: CONFIG_PATH,
    structures: `${USER_FOLDER}structures/`,
    integrations: `${USER_FOLDER}integrations/`,
  },
};

export const AUTOSAVE_INTERVAL = 60000;
export const NOTIFICATION_TIMEOUT = 2500;

export const ROUTES = {
  WRAPPER: '/',
  STRUCTURE: '/structure',
  STRUCTURE_DETAIL: '/structure-detail',
  INTEGRATION: '/integration',
  WIZARD: '/wizard',
  SETTINGS: '/settings',
};

export const NavbarItems: Array<RouteItem> = [
  {
    title: 'Structures',
    route: ROUTES.STRUCTURE,
    icon: 'list alternate outline',
  },
  {
    title: 'Integrations',
    route: ROUTES.INTEGRATION,
    icon: 'object ungroup outline',
  },
  {
    title: 'Wizard',
    route: ROUTES.WIZARD,
    icon: 'wizard',
  },
  {
    title: 'Settings',
    route: ROUTES.SETTINGS,
    icon: 'settings',
  },
];

// Init values for generic redux state
export const LOADING: PageLoading = {
  loading: false,
  loaded: false,
};
export const ERROR: PageError = {
  errorState: false,
  errorMessage: '',
};
export const INITIALIZES: Initializes = {
  initError: ERROR,
  initLoading: LOADING,
};

export const COLORS: Array<SemanticCOLORS> = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
];

export const FIELD_COLORS = {
  Any: COLORS[11],
  String: COLORS[0],
  Integer: COLORS[1],
  Double: COLORS[10],
  Boolean: COLORS[9],
  Date: COLORS[4],
  Timestamp: COLORS[5],
  Json: COLORS[6],
  Enum: COLORS[7],
  Array: COLORS[8],
};

export const VerticalPaddingReset: CSSProperties = {
  paddingTop: 0,
  paddingBottom: 0,
};

export const HorizontalPaddingReset: CSSProperties = {
  paddingRight: 0,
  paddingLeft: 0,
};
