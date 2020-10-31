import {
  INITIALIZE_SETTINGS,
  INITIALIZE_SETTINGS_SUCCESS,
  SAVE_SETTINGS,
  SET_DEFAULTS,
  CHANGE_PATH,
} from '../redux.types';
import { UserSettings } from '../../types/settings.types';
import { History } from 'history';

interface InitializeSettings {
  type: typeof INITIALIZE_SETTINGS;
  payload: {
    history: History
  };
}

interface InitializeSettingsSuccess {
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
  | InitializeSettings
  | InitializeSettingsSuccess
  | SetDefaultAction
  | SaveSettingsAction
  | ChangePathAction;
