import {
  INITIALIZE_SETTINGS,
  INITIALIZE_SETTINGS_SUCCESS,
  INITIALIZE_SETTINGS_ERROR,
  SAVE_SETTINGS,
  SET_DEFAULTS,
  CHANGE_PATH,
} from '../redux.types';
import { UserConfig } from '../../types/settings.types';

interface initSettings {
  type: typeof INITIALIZE_SETTINGS;
  payload: { forceNew?: Boolean };
}

interface initSettingsSuccess {
  type: typeof INITIALIZE_SETTINGS_SUCCESS;
  payload: { settings: UserConfig };
}

interface initSettingsError {
  type: typeof INITIALIZE_SETTINGS_ERROR;
  payload: { message?: String };
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
    pathKey: String;
    newPath: String;
  };
}

export type SettingActionTypes =
  | initSettings
  | initSettingsSuccess
  | initSettingsError
  | SetDefaultAction
  | SaveSettingsAction
  | ChangePathAction;
