import { ActionCreator } from 'redux';
import { CHANGE_PATH, SET_DEFAULTS } from '../redux.types';
import { SettingActionTypes } from './action.types';

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

export const getLogMessage = (pathKey: string, newPath: string) => ({
  type: CHANGE_PATH,
  payload: { pathKey, newPath },
});
