import {
  INITIALIZE_SETTINGS,
  INITIALIZE_SETTINGS_SUCCESS,
  INITIALIZE_SETTINGS_FAILED,
  SAVE_SETTINGS,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAILED,
  SET_DEFAULTS,
  CHANGE_PATH,
  CHANGE_PATH_SUCCESS,
  VALUE_CHANGE_SETTINGS,
} from '../redux.types';
import { UserConfig, SettingPathInterface } from '../../types';

export interface ValueChangeSettigns {
  type: typeof VALUE_CHANGE_SETTINGS;
  payload: { reducer: string; key: string; value: any };
}

export interface InitSettings {
  type: typeof INITIALIZE_SETTINGS;
  payload: { forceReset?: boolean };
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
  payload: {
    settings: UserConfig;
    newPaths: SettingPathInterface;
  };
}

export interface SaveSettingsSuccess {
  type: typeof SAVE_SETTINGS_SUCCESS;
  payload: { settings: UserConfig };
}

export interface SaveSettingsFailed {
  type: typeof SAVE_SETTINGS_FAILED;
  payload: { message: string };
}

export interface ChangePathAction {
  type: typeof CHANGE_PATH;
  payload: {
    pathKey: string;
    newPath: string;
  };
}

export interface ChangePathSuccess {
  type: typeof CHANGE_PATH_SUCCESS;
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
  | SaveSettingsSuccess
  | SaveSettingsFailed
  | ChangePathAction
  | ChangePathSuccess
  | ValueChangeSettigns;
