import {
  INITIALIZE_SETTINGS,
  INITIALIZE_SETTINGS_SUCCESS,
  INITIALIZE_SETTINGS_FAILED,
  SAVE_SETTINGS,
  SET_DEFAULTS,
  CHANGE_PATH,
} from '../redux.types';
import { UserConfig } from '../../types/settings.types';

export interface InitSettings {
  type: typeof INITIALIZE_SETTINGS;
  payload: null;
}

export interface InitSettingsSuccess {
  type: typeof INITIALIZE_SETTINGS_SUCCESS;
  payload: { settings: UserConfig };
}

export interface InitSettingsFailed {
  type: typeof INITIALIZE_SETTINGS_FAILED;
  payload: { message?: string };
}

export interface SetDefaultAction {
  type: typeof SET_DEFAULTS;
  payload: null;
}

export interface SaveSettingsAction {
  type: typeof SAVE_SETTINGS;
  payload: null;
}

export interface ChangePathAction {
  type: typeof CHANGE_PATH;
  payload: {
    pathKey: string;
    newPath: string;
  };
}

export type SettingActionTypes =
  | InitSettings
  | InitSettingsSuccess
  | InitSettingsFailed
  | SetDefaultAction
  | SaveSettingsAction
  | ChangePathAction;
