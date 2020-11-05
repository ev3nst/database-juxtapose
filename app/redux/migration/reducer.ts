import {
  INITIALIZE_MIGRATION,
  INITIALIZE_MIGRATION_SUCCESS,
  INITIALIZE_MIGRATION_FAILED,
  SAVE_MIGRATION,
  SAVE_MIGRATION_SUCCESS,
} from '../redux.types';
import { InteractiveResponder } from '../../types';
import { MigrationActionTypes } from './action.types';

export interface MigrationState extends InteractiveResponder {
  migration: any;
}

const INIT_STATE: MigrationState = {
  loading: true,
  loaded: false,
  errorState: false,
  errorMessage: '',
  migration: {},
};

const RESET_ERROR = {
  errorState: false,
  errorMessage: '',
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
        ...RESET_ERROR,
        loading: false,
        loaded: true,
      };
    case INITIALIZE_MIGRATION_FAILED:
      return {
        ...INIT_STATE,
        loading: false,
        loaded: false,
        errorState: true,
        errorMessage: action.payload.message ? action.payload.message.toString() : '',
      };
    case SAVE_MIGRATION:
      return {
        ...state,
        ...action.payload.migration,
        loading: true,
      };
    case SAVE_MIGRATION_SUCCESS:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};

export default reducer;
