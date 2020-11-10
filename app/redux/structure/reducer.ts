import {
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  MANIPULATE_STRUCTURE_HEADER,
  MANIPULATE_STRUCTURE_FIELD,
} from '../redux.types';
import { InteractiveResponder, StructureItem } from '../../types';
import { StructureActionTypes } from './action.types';
import { LOADING, ERROR, INITIALIZES } from '../../utils/constants';

export interface StructureState extends InteractiveResponder {
  newStructure: StructureItem;
}

const INIT_STATE: StructureState = {
  ...ERROR,
  ...LOADING,
  ...INITIALIZES,
  newStructure: {},
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
        newStructure: action.payload.structure,
        initLoading: {
          loading: false,
          loaded: true,
        },
        initError: {
          errorState: false,
          errorMessage: '',
        },
      };
    case INITIALIZE_STRUCTURE_FAILED:
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
    case SAVE_STRUCTURE:
      return {
        ...state,
        loading: true,
      };
    case SAVE_STRUCTURE_SUCCESS:
      return { ...state, loading: false };
    case MANIPULATE_STRUCTURE_HEADER: {
      if (action.payload.action === 'add') {
        return {
          ...state,
          newStructure: {
            ...state.newStructure,
            [action.payload.label]: [],
          },
        };
      }
      const headerToRemove = action.payload.label;
      const {
        [headerToRemove]: {},
        ...removedStructure
      } = state.newStructure;
      return { ...state, newStructure: removedStructure };
    }
    case MANIPULATE_STRUCTURE_FIELD: {
      if (action.payload.action === 'add') {
        return {
          ...state,
          newStructure: {
            ...state.newStructure,
            [action.payload.header]: state.newStructure[action.payload.header].concat(
              action.payload.label
            ),
          },
        };
      }
      const indexToRemove = state.newStructure[action.payload.header].indexOf(
        action.payload.label
      );
      return {
        ...state,
        newStructure: {
          ...state.newStructure,
          [action.payload.header]: [
            ...state.newStructure[action.payload.header].slice(0, indexToRemove),
            ...state.newStructure[action.payload.header].slice(indexToRemove + 1),
          ],
        },
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
