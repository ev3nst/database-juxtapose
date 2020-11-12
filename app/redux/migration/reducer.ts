import {
  SAVE_MIGRATION,
  SAVE_MIGRATION_SUCCESS,
  CHANGE_MIGRATION,
  CHANGE_MIGRATION_SUCCESS,
  CHANGE_MIGRATION_FAILED,
  INITIALIZE_MIGRATION,
  INITIALIZE_MIGRATION_SUCCESS,
  INITIALIZE_MIGRATION_FAILED,
} from '../redux.types';
import { InteractiveResponder, MigrationObject } from '../../types';
import { MigrationActionTypes } from './action.types';
import { LOADING, ERROR, INITIALIZES } from '../../utils/constants';

export interface MigrationState extends InteractiveResponder {
  autosaveLoading: boolean;
  allMigrations: Array<any>;
  dataMigration: MigrationObject;
  migrationFile: string;
}

const INIT_STATE: MigrationState = {
  ...ERROR,
  ...LOADING,
  ...INITIALIZES,
  autosaveLoading: false,
  allMigrations: [],
  dataMigration: [],
  migrationFile: 'migration_autosave',
};

const reducer = (
  state: MigrationState = INIT_STATE,
  action: MigrationActionTypes
): MigrationState => {
  switch (action.type) {
    case INITIALIZE_MIGRATION:
      return { ...state, loading: true };
    case INITIALIZE_MIGRATION_SUCCESS:
      return {
        ...state,
        ...action.payload.migration,
        initLoading: {
          loading: false,
          loaded: true,
        },
        initError: {
          errorState: false,
          errorMessage: '',
        },
      };
    case INITIALIZE_MIGRATION_FAILED:
      return {
        ...INIT_STATE,
        initLoading: {
          loading: false,
          loaded: false,
        },
        initError: {
          errorState: true,
          errorMessage: action.payload.message ? action.payload.message.toString() : '',
        },
      };
    case SAVE_MIGRATION:
      return {
        ...state,
        loading: !action.payload.isAutosave,
        autosaveLoading: action.payload.isAutosave,
      };
    case SAVE_MIGRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        autosaveLoading: false,
        migrationFile: action.payload.fileName,
        allMigrations:
          action.payload.isAutosave === true
            ? state.allMigrations
            : state.allMigrations.concat(action.payload.fileName),
      };
    case CHANGE_MIGRATION:
      return { ...state, loading: true };
    case CHANGE_MIGRATION_SUCCESS:
      return {
        ...state,
        migrationFile: action.payload.migrationFile.replace('.json', ''),
        dataMigration: action.payload.dataMigration,
      };
    case CHANGE_MIGRATION_FAILED:
      return {
        ...INIT_STATE,
        errorState: true,
        errorMessage: action.payload.message,
      };
    default:
      return { ...state };
  }
};

export default reducer;
