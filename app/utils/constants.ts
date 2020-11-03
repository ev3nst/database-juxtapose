const { app } = require('electron').remote;

export const APP_NAME = app.getName();

export const FOLDER_PREFIX = '/' + APP_NAME + '/';
export const USER_FOLDER = app.getPath('documents') + FOLDER_PREFIX;
export const CONFIG_PATH = USER_FOLDER + 'settings.json';

export const STRUCTURE_AUTOSAVE_FILE = 'structure_autosave.json';
export const MIGRATION_AUTOSAVE_FILE = 'migration_autosave.json';

export const defaultConfig = {
  autoSave: true,
  paths: {
    userSettings: CONFIG_PATH,
    structures: USER_FOLDER + 'structures/',
    migrations: USER_FOLDER + 'migrations/',
  },
};

export const INTERVAL_TIMEOUT = 10000;
