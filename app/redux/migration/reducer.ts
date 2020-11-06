import {
  INITIALIZE_MIGRATION,
  INITIALIZE_MIGRATION_SUCCESS,
  INITIALIZE_MIGRATION_FAILED,
  SAVE_MIGRATION,
  SAVE_MIGRATION_SUCCESS,
} from '../redux.types';
import { InteractiveResponder } from '../../types';
import { MigrationActionTypes } from './action.types';
import { LOADING, ERROR, INITIALIZES } from '../../utils/constants';

export interface MigrationState extends InteractiveResponder {
  migration: any;
}

const INIT_STATE: MigrationState = {
  ...ERROR,
  ...LOADING,
  ...INITIALIZES,
  migration: {},
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
