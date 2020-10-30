const { app } = require('electron').remote;

export const APP_NAME = app.getName();
export const FOLDER_PREFIX = '/' + APP_NAME;
export const USER_FOLDER = app.getPath('documents') + FOLDER_PREFIX;
export const SETTINGS_PATH =
  app.getPath('documents') + FOLDER_PREFIX + '/settings.json';

export const defaultConfig = {
  paths: {
    userSettings: USER_FOLDER + '/settings.json',
    structures: USER_FOLDER + '/structures',
    migrations: USER_FOLDER + '/migrations',
  },
};
