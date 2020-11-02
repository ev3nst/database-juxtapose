import { ActionCreator } from 'redux';
import {
  INITIALIZE_SETTINGS,
  INITIALIZE_SETTINGS_SUCCESS,
  CHANGE_PATH,
  SET_DEFAULTS,
} from '../redux.types';
import { SettingActionTypes } from './action.types';
import { UserSettings } from '../../types/settings.types';

export const initSettings: ActionCreator<SettingActionTypes> = () => ({
  type: INITIALIZE_SETTINGS,
  payload: null,
});

export const initSettingsSuccess: ActionCreator<SettingActionTypes> = (
  settings: UserSettings
) => ({
  type: INITIALIZE_SETTINGS_SUCCESS,
  payload: { settings },
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
