import {
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  MANIPULATE_STRUCTURE_HEADER,
  MANIPULATE_STRUCTURE_CONTENT,
} from '../redux.types';
import { InteractiveResponder } from '../../types';
import { StructureActionTypes } from './action.types';

export interface StructureState extends InteractiveResponder {
  saveLoading: boolean;
  newStructure: any;
}

const INIT_STATE: StructureState = {
  saveLoading: false,
  loading: true,
  loaded: false,
  errorState: false,
  errorMessage: '',
  newStructure: {},
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
        ...RESET_ERROR,
        newStructure: action.payload.structure,
        loading: false,
        loaded: true,
      };
    case INITIALIZE_STRUCTURE_FAILED:
      return {
        ...INIT_STATE,
        loading: false,
        loaded: false,
        errorState: true,
        errorMessage: action.payload.message
          ? action.payload.message.toString()
          : '',
      };
    case SAVE_STRUCTURE:
      return {
        ...state,
        saveLoading: true,
      };
    case SAVE_STRUCTURE_SUCCESS:
      return { ...state, saveLoading: false };
    case MANIPULATE_STRUCTURE_HEADER:
      if (action.payload.action == 'add') {
        return {
          ...state,
          newStructure: {
            ...state.newStructure,
            [action.payload.label]: [],
          },
        };
      } else {
        const headerToRemove = action.payload.label;
        const {
          [headerToRemove]: {},
          ...removedStructure
        } = state.newStructure;
        return { ...state, newStructure: removedStructure };
      }
    case MANIPULATE_STRUCTURE_CONTENT:
      if (action.payload.action == 'add') {
        return {
          ...state,
          newStructure: {
            ...state.newStructure,
            [action.payload.header]: state.newStructure[
              action.payload.header
            ].concat(action.payload.label),
          },
        };
      } else {
        const indexToRemove = state.newStructure[action.payload.header].indexOf(
          action.payload.label
        );
        return {
          ...state,
          newStructure: {
            ...state.newStructure,
            [action.payload.header]: [
              ...state.newStructure[action.payload.header].slice(
                0,
                indexToRemove
              ),
              ...state.newStructure[action.payload.header].slice(
                indexToRemove + 1
              ),
            ],
          },
        };
      }
    default:
      return { ...state };
  }
};

export default reducer;
