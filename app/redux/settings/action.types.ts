import { SAVE_SETTINGS, SET_DEFAULTS, CHANGE_PATH } from '../redux.types';

interface SetDefaultAction {
  type: typeof SET_DEFAULTS;
  payload: null;
}

interface SaveSettingsAction {
  type: typeof SAVE_SETTINGS;
  payload: null;
}

interface ChangePathAction {
  type: typeof CHANGE_PATH;
  payload: {
    pathKey: string;
    newPath: string;
  };
}

export type SettingActionTypes =
  | SetDefaultAction
  | SaveSettingsAction
  | ChangePathAction;
