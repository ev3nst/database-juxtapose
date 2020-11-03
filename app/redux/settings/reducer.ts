import {
  INITIALIZE_SETTINGS_SUCCESS,
  INITIALIZE_SETTINGS_FAILED,
  SAVE_SETTINGS,
  CHANGE_PATH,
} from '../redux.types';
import { UserConfig, InteractiveResponder } from '../../types';
import { SettingActionTypes } from './action.types';

export interface SettingsState extends UserConfig, InteractiveResponder {}

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
  console.log(action.type, 'ACTION TYPE');
  switch (action.type) {
    case INITIALIZE_SETTINGS_SUCCESS:
      return {
        ...state,
        ...action.payload.settings,
        ...RESET_ERROR,
        loading: false,
        loaded: true,
      };
    case INITIALIZE_SETTINGS_FAILED:
      return {
        ...INIT_STATE,
        loading: false,
        loaded: false,
        errorState: true,
        errorMessage: action.payload.message
          ? action.payload.message.toString()
          : '',
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
