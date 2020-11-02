import {
  INITIALIZE_SETTINGS,
  INITIALIZE_SETTINGS_SUCCESS,
  SAVE_SETTINGS,
  SET_DEFAULTS,
  CHANGE_PATH,
} from '../redux.types';
import { UserSettings } from '../../types/settings.types';

interface initSettings {
  type: typeof INITIALIZE_SETTINGS;
  payload: null;
}

interface initSettingsSuccess {
  type: typeof INITIALIZE_SETTINGS_SUCCESS;
  payload: { settings: UserSettings };
}

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
  | initSettings
  | initSettingsSuccess
  | SetDefaultAction
  | SaveSettingsAction
  | ChangePathAction;
