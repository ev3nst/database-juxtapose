import { CSSProperties } from 'react';
import { remote } from 'electron';
import { SemanticCOLORS } from 'semantic-ui-react';
import { RouteItem } from '../components/Navbar';
import routes from './routes.json';
import { Initializes, PageError, PageLoading } from '../types';

export const WINDOW = remote.getCurrentWindow();
export const APP_NAME = remote.app.getName();
export const DARK_MODE = window.localStorage.getItem('dark_mode') === 'on';
export const PAGINATION_LIMIT = 10;

export const FOLDER_PREFIX = `/${APP_NAME}/`;
export const USER_FOLDER = remote.app.getPath('documents') + FOLDER_PREFIX;
export const CONFIG_PATH = `${USER_FOLDER}settings.json`;

export const STRUCTURE_AUTOSAVE_NAME = 'structure_autosave';
export const STRUCTURE_AUTOSAVE_FILE = `${STRUCTURE_AUTOSAVE_NAME}.json`;
export const MIGRATION_AUTOSAVE_NAME = 'migration_autosave';
export const MIGRATION_AUTOSAVE_FILE = `${MIGRATION_AUTOSAVE_NAME}.json`;

export const defaultConfig = {
  autoSave: true,
  paths: {
    userSettings: CONFIG_PATH,
    structures: `${USER_FOLDER}structures/`,
    migrations: `${USER_FOLDER}migrations/`,
  },
};

export const AUTOSAVE_INTERVAL = 60000;
export const NOTIFICATION_TIMEOUT = 2500;

export const NavbarItems: Array<RouteItem> = [
  {
    title: 'Structures',
    route: routes.STRUCTURE,
    icon: 'list alternate outline',
  },
  {
    title: 'Migrations',
    route: routes.MIGRATION,
    icon: 'object ungroup outline',
  },
  {
    title: 'Wizard',
    route: routes.WIZARD,
    icon: 'wizard',
  },
  {
    title: 'Settings',
    route: routes.SETTINGS,
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
  String: COLORS[0],
  Integer: COLORS[1],
  Double: COLORS[2],
  Boolean: COLORS[9],
  Date: COLORS[4],
  Timestamp: COLORS[5],
  Json: COLORS[6],
  Enum: COLORS[7],
  Array: COLORS[8],
  Any: COLORS[11],
};

export const VerticalPaddingReset: CSSProperties = {
  paddingTop: 0,
  paddingBottom: 0,
};

export const HorizontalPaddingReset: CSSProperties = {
  paddingRight: 0,
  paddingLeft: 0,
};
