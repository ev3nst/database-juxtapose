import {
  INITIALIZE_SETTINGS_SUCCESS,
  INITIALIZE_SETTINGS_FAILED,
  VALUE_CHANGE_SETTINGS,
  CHANGE_PATH_SUCCESS,
  SAVE_SETTINGS,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAILED,
  CANCEL_SETTINGS_SUCCESS,
} from '../redux.types';
import { UserConfig, InteractiveResponder, SettingPathInterface } from '../../types';
import { SettingActionTypes } from './action.types';
import { LOADING, ERROR, INITIALIZES } from '../../utils/constants';

export interface SettingsState extends UserConfig, InteractiveResponder {
  newPaths: SettingPathInterface;
}

const INIT_STATE: SettingsState = {
  ...ERROR,
  ...LOADING,
  ...INITIALIZES,
  autoSave: true,
  paths: {
    userSettings: '',
    structures: '',
    migrations: '',
  },
  newPaths: {
    userSettings: '',
    structures: '',
    migrations: '',
  },
};

const reducer = (
  state: SettingsState = INIT_STATE,
  action: SettingActionTypes
): SettingsState => {
  switch (action.type) {
    case VALUE_CHANGE_SETTINGS:
      return { ...state, [action.payload.key]: action.payload.value };
    case INITIALIZE_SETTINGS_SUCCESS:
      return {
        ...state,
        ...action.payload.settings,
        initLoading: {
          loading: false,
          loaded: true,
        },
        initError: {
          errorState: false,
          errorMessage: '',
        },
      };
    case INITIALIZE_SETTINGS_FAILED:
      return {
        ...INIT_STATE,
        initLoading: {
          loading: false,
          loaded: false,
        },
        initError: {
          errorState: true,
          errorMessage: action.payload.message ? action.payload.message : '',
        },
      };
    case SAVE_SETTINGS:
      return {
        ...state,
        ...ERROR,
        loading: true,
      };
    case SAVE_SETTINGS_SUCCESS:
      return {
        ...state,
        ...ERROR,
        paths: {
          ...state.paths,
          structures:
            state.newPaths.structures !== '' &&
            state.newPaths.structures !== state.paths.structures
              ? state.newPaths.structures
              : state.paths.structures,
          migrations:
            state.newPaths.migrations !== '' &&
            state.newPaths.migrations !== state.paths.migrations
              ? state.newPaths.migrations
              : state.paths.migrations,
        },
        autoSave: action.payload.settings.autoSave,
        loading: false,
      };
    case SAVE_SETTINGS_FAILED:
      return {
        ...state,
        loading: false,
        errorState: true,
        errorMessage: action.payload.message,
      };
    case CHANGE_PATH_SUCCESS:
      return {
        ...state,
        ...ERROR,
        newPaths: {
          ...state.newPaths,
          [action.payload.pathKey]: action.payload.newPath,
        },
      };
    case CANCEL_SETTINGS_SUCCESS:
      return {
        ...state,
        paths: action.payload.settings.paths,
        autoSave: action.payload.settings.autoSave,
        newPaths: { ...INIT_STATE.newPaths },
      };
    default:
      return { ...state };
  }
};

export default reducer;
