import { ActionCreator } from 'redux';
import {
  CHANGE_PATH,
  SET_DEFAULTS,
  INITIALIZE_SETTINGS,
  INITIALIZE_SETTINGS_SUCCESS,
  INITIALIZE_SETTINGS_FAILED,
} from '../redux.types';
import { SettingActionTypes } from './action.types';
import { UserConfig } from '../../types/settings.types';

export const initSettings: ActionCreator<SettingActionTypes> = () => ({
  type: INITIALIZE_SETTINGS,
  payload: null,
});

export const initSettingsSuccess: ActionCreator<SettingActionTypes> = (
  settings: UserConfig
) => ({
  type: INITIALIZE_SETTINGS_SUCCESS,
  payload: { settings },
});

export const initSettingsFailed: ActionCreator<SettingActionTypes> = (
  message?: String
) => ({
  type: INITIALIZE_SETTINGS_FAILED,
  payload: { message },
});

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
