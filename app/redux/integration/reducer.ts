import {
  SAVE_INTEGRATION,
  SAVE_INTEGRATION_SUCCESS,
  CHANGE_INTEGRATION,
  CHANGE_INTEGRATION_SUCCESS,
  CHANGE_INTEGRATION_FAILED,
  INITIALIZE_INTEGRATION,
  INITIALIZE_INTEGRATION_SUCCESS,
  INITIALIZE_INTEGRATION_FAILED,
} from '../redux.types';
import { InteractiveResponder, IntegrationObject } from '../../types';
import { IntegrationActionTypes } from './action.types';
import { LOADING, ERROR, INITIALIZES, EMPTY_INTEGRATION } from '../../utils/constants';

export interface IntegrationState extends InteractiveResponder {
  autosaveLoading: boolean;
  allIntegrations: Array<any>;
  dataIntegration: IntegrationObject;
  integrationFile: string;
}

const INIT_STATE: IntegrationState = {
  ...ERROR,
  ...LOADING,
  ...INITIALIZES,
  autosaveLoading: false,
  allIntegrations: [],
  dataIntegration: EMPTY_INTEGRATION,
  integrationFile: 'integration_autosave',
};

const reducer = (
  state: IntegrationState = INIT_STATE,
  action: IntegrationActionTypes
): IntegrationState => {
  switch (action.type) {
    case INITIALIZE_INTEGRATION:
      return { ...state, loading: true };
    case INITIALIZE_INTEGRATION_SUCCESS:
      return {
        ...state,
        ...action.payload.integration,
        initLoading: {
          loading: false,
          loaded: true,
        },
        initError: {
          errorState: false,
          errorMessage: '',
        },
      };
    case INITIALIZE_INTEGRATION_FAILED:
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
    case SAVE_INTEGRATION:
      return {
        ...state,
        loading: !action.payload.isAutosave,
        autosaveLoading: action.payload.isAutosave,
      };
    case SAVE_INTEGRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        autosaveLoading: false,
        integrationFile: action.payload.fileName,
        allIntegrations:
          action.payload.isAutosave === true
            ? state.allIntegrations
            : state.allIntegrations.concat(action.payload.fileName),
      };
    case CHANGE_INTEGRATION:
      return { ...state, loading: true };
    case CHANGE_INTEGRATION_SUCCESS:
      return {
        ...state,
        integrationFile: action.payload.integrationFile.replace('.json', ''),
        dataIntegration: action.payload.dataIntegration,
      };
    case CHANGE_INTEGRATION_FAILED:
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
