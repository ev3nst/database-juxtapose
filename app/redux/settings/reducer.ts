import { SAVE_SETTINGS, CHANGE_PATH } from '../redux.types';
import { SettingPathInterface } from '../../types/settings.types';
import { SettingActionTypes } from './action.types';

export interface SettingsState {
  paths: SettingPathInterface;
}

const INIT_STATE: SettingsState = {
  paths: {
    settings: '',
    structures: '',
    migrations: '',
  },
};

const reducer = (
  state: SettingsState = INIT_STATE,
  action: SettingActionTypes
): SettingsState => {
  switch (action.type) {
    case SAVE_SETTINGS:
      return { ...state };
    case CHANGE_PATH:
      console.log(action.payload, 'CHANGE_PATH is CALLED');
      return { ...state };
    default:
      return { ...state };
  }
};

export default reducer;
