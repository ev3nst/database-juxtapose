import {
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
} from '../redux.types';
import { StructureActionTypes } from './action.types';

export interface StructureState {
  loading: Boolean;
  loaded: Boolean;
}

const INIT_STATE: StructureState = {
  loading: true,
  loaded: false,
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
        ...action.payload.structure,
        loading: false,
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
