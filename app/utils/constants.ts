import { remote } from 'electron';
import { SemanticCOLORS } from 'semantic-ui-react';
import { RouteItem } from '../components/Navbar';
import routes from './routes.json';
import { Initializes, PageError, PageLoading } from '../types';

export const APP_NAME = remote.app.getName();

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
    title: 'CREATE NEW',
    icon: 'add',
    dropdown: true,
    items: [
      {
        title: 'Content Structure',
        route: routes.NEW_STRUCTURE,
        icon: 'file alternate outline',
      },
      {
        title: 'Database Migration',
        route: routes.NEW_MIGRATION,
        icon: 'file code outline',
      },
    ],
  },
  {
    title: 'Content Structures',
    route: routes.CONTENT_STRUCTURES,
    icon: 'list alternate outline',
  },
  {
    title: 'Database Migrations',
    route: routes.DATABASE_MIGRATIONS,
    icon: 'object ungroup outline',
  },
  {
    title: 'Migration Wizard',
    route: routes.MIGRATION_WIZARD,
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
