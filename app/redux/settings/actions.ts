import { ActionCreator } from 'redux';
import {
  INITIALIZE_SETTINGS,
  INITIALIZE_SETTINGS_SUCCESS,
  INITIALIZE_SETTINGS_ERROR,
  CHANGE_PATH,
  SET_DEFAULTS,
} from '../redux.types';
import { SettingActionTypes } from './action.types';
import { UserConfig } from '../../types/settings.types';

export const initSettings: ActionCreator<SettingActionTypes> = (
  forceNew?: Boolean
) => ({
  type: INITIALIZE_SETTINGS,
  payload: { forceNew },
});

export const initSettingsSuccess: ActionCreator<SettingActionTypes> = (
  settings: UserConfig
) => ({
  type: INITIALIZE_SETTINGS_SUCCESS,
  payload: { settings },
});

export const initSettingsError: ActionCreator<SettingActionTypes> = (
  message?: String
) => ({
  type: INITIALIZE_SETTINGS_ERROR,
  payload: { message },
});

initSettingsSuccess;
export const changePath: ActionCreator<SettingActionTypes> = (
  pathKey: string,
  newPath: string
) => ({
  type: CHANGE_PATH,
  payload: { pathKey, newPath },
});

export const setDefault: ActionCreator<SettingActionTypes> = () => ({
  type: SET_DEFAULTS,
  payload: null,
});
