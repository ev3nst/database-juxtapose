import {
  INITIALIZE_SETTINGS,
  INITIALIZE_SETTINGS_SUCCESS,
  SAVE_SETTINGS,
  CHANGE_PATH,
} from '../redux.types';
import { UserSettings } from '../../types/settings.types';
import { SettingActionTypes } from './action.types';

export interface SettingsState extends UserSettings {
  loading: Boolean;
}

const INIT_STATE: SettingsState = {
  paths: {
    userSettings: '',
    structures: '',
    migrations: '',
  },
  loading: true,
};

const reducer = (
  state: SettingsState = INIT_STATE,
  action: SettingActionTypes
): SettingsState => {
  switch (action.type) {
    case INITIALIZE_SETTINGS:
      return { ...state, loading: true };
    case INITIALIZE_SETTINGS_SUCCESS:
      return {
        ...state,
        ...action.payload.settings,
        loading: false,
      };
    case SAVE_SETTINGS:
      return { ...state };
    case CHANGE_PATH:
      return { ...state };
    default:
      return { ...state };
  }
};

export default reducer;
