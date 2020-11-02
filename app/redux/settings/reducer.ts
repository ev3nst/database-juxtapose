import {
  INITIALIZE_SETTINGS,
  INITIALIZE_SETTINGS_SUCCESS,
  INITIALIZE_SETTINGS_ERROR,
  SAVE_SETTINGS,
  CHANGE_PATH,
} from '../redux.types';
import { UserConfig } from '../../types/settings.types';
import { SettingActionTypes } from './action.types';

export interface SettingsState extends UserConfig {
  loading: Boolean;
  loaded: Boolean;
  errorState: Boolean;
  errorMessage: String;
}

const INIT_STATE: SettingsState = {
  autoSave: true,
  paths: {
    userSettings: '',
    structures: '',
    migrations: '',
  },
  loading: true,
  loaded: false,
  errorState: false,
  errorMessage: '',
};

const RESET_ERROR = {
  errorState: false,
  errorMessage: '',
};

const reducer = (
  state: SettingsState = INIT_STATE,
  action: SettingActionTypes
): SettingsState => {
  switch (action.type) {
    case INITIALIZE_SETTINGS:
      return {
        ...state,
        ...RESET_ERROR,
        loading: true,
      };
    case INITIALIZE_SETTINGS_SUCCESS:
      return {
        ...state,
        ...action.payload.settings,
        ...RESET_ERROR,
        loading: false,
        loaded: true,
      };
    case INITIALIZE_SETTINGS_ERROR:
      return {
        ...INIT_STATE,
        loading: false,
        loaded: false,
        errorState: true,
        errorMessage: action.payload.message ? action.payload.message : '',
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
