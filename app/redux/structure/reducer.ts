import {
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
} from '../redux.types';
import { InteractiveResponder } from '../../types';
import { StructureActionTypes } from './action.types';

export interface StructureState extends InteractiveResponder {
}

const INIT_STATE: StructureState = {
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
  state: StructureState = INIT_STATE,
  action: StructureActionTypes
): StructureState => {
  switch (action.type) {
    case INITIALIZE_STRUCTURE:
      return { ...state, loading: true };
    case INITIALIZE_STRUCTURE_SUCCESS:
      return {
        ...state,
        // ...action.payload.structure,
        ...RESET_ERROR,
        loading: false,
      };
    case INITIALIZE_STRUCTURE_FAILED:
      return {
        ...INIT_STATE,
        loading: false,
        loaded: false,
        errorState: true,
        errorMessage: action.payload.message ? action.payload.message : '',
      };
    case SAVE_STRUCTURE:
      return {
        ...state,
        ...action.payload.structure,
        loading: true,
      };
    case SAVE_STRUCTURE_SUCCESS:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};

export default reducer;
