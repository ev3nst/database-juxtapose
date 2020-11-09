import { ActionCreator } from 'redux';
import {
  CHANGE_PATH,
  CHANGE_PATH_SUCCESS,
  INITIALIZE_SETTINGS,
  INITIALIZE_SETTINGS_SUCCESS,
  INITIALIZE_SETTINGS_FAILED,
  SAVE_SETTINGS,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAILED,
  CANCEL_SETTINGS,
  CANCEL_SETTINGS_SUCCESS,
} from '../redux.types';
import { SettingActionTypes } from './action.types';
import { UserConfig, SettingPathInterface } from '../../types';

export const initSettings: ActionCreator<SettingActionTypes> = (
  forceReset?: boolean
) => ({
  type: INITIALIZE_SETTINGS,
  payload: { forceReset },
});

export const initSettingsSuccess: ActionCreator<SettingActionTypes> = (
  settings: UserConfig
) => ({
  type: INITIALIZE_SETTINGS_SUCCESS,
  payload: { settings },
});

export const initSettingsFailed: ActionCreator<SettingActionTypes> = (
  message?: string
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

export const changePathSuccess: ActionCreator<SettingActionTypes> = (
  pathKey: string,
  newPath: string
) => ({
  type: CHANGE_PATH_SUCCESS,
  payload: { pathKey, newPath },
});

export const saveSettings: ActionCreator<SettingActionTypes> = (
  settings: UserConfig,
  newPaths: SettingPathInterface
) => ({
  type: SAVE_SETTINGS,
  payload: { settings, newPaths },
});

export const saveSettingsSuccess: ActionCreator<SettingActionTypes> = (
  settings: UserConfig
) => ({
  type: SAVE_SETTINGS_SUCCESS,
  payload: { settings },
});

export const saveSettingsFailed: ActionCreator<SettingActionTypes> = (
  message: string
) => ({
  type: SAVE_SETTINGS_FAILED,
  payload: { message },
});

export const cancelSettings: ActionCreator<SettingActionTypes> = () => ({
  type: CANCEL_SETTINGS,
  payload: null,
});

export const cancelSettingsSuccess: ActionCreator<SettingActionTypes> = (
  settings: UserConfig
) => ({
  type: CANCEL_SETTINGS_SUCCESS,
  payload: { settings },
});
