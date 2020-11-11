import { remote } from 'electron';
import { SemanticCOLORS } from 'semantic-ui-react';
import { RouteItem } from '../components/Navbar';
import routes from './routes.json';
import { Initializes, PageError, PageLoading } from '../types';

export const APP_NAME = remote.app.getName();
export const DARK_MODE = window.localStorage.getItem('dark_mode') === 'on';
export const PAGINATION_LIMIT = 10;

export const FOLDER_PREFIX = `\\${APP_NAME}\\`;
export const USER_FOLDER = remote.app.getPath('documents') + FOLDER_PREFIX;
export const CONFIG_PATH = `${USER_FOLDER}settings.json`;

export const STRUCTURE_AUTOSAVE_FILE = 'structure_autosave.json';
export const MIGRATION_AUTOSAVE_FILE = 'migration_autosave.json';

export const defaultConfig = {
  autoSave: true,
  paths: {
    userSettings: CONFIG_PATH,
    structures: `${USER_FOLDER}structures\\`,
    migrations: `${USER_FOLDER}migrations\\`,
  },
};

export const INTERVAL_TIMEOUT = 10000;
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
