import {
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  CHANGE_STRUCTURE,
  CHANGE_STRUCTURE_SUCCESS,
  CHANGE_STRUCTURE_FAILED,
  MANIPULATE_STRUCTURE_HEADER,
  MANIPULATE_STRUCTURE_FIELD,
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
} from '../redux.types';
import { InteractiveResponder, StructureObject } from '../../types';
import { StructureActionTypes } from './action.types';
import { LOADING, ERROR, INITIALIZES } from '../../utils/constants';

export interface StructureState extends InteractiveResponder {
  autosaveLoading: boolean;
  allStructures: Array<any>;
  dataStructure: StructureObject;
  structureFile: string;
}

const INIT_STATE: StructureState = {
  ...ERROR,
  ...LOADING,
  ...INITIALIZES,
  autosaveLoading: false,
  allStructures: [],
  dataStructure: {},
  structureFile: 'structure_autosave',
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
        allStructures: action.payload.allStructures,
        dataStructure: action.payload.structure,
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
        loading: !action.payload.isAutosave,
        autosaveLoading: action.payload.isAutosave,
      };
    case SAVE_STRUCTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        autosaveLoading: false,
        structureFile: action.payload.fileName,
      };
    case CHANGE_STRUCTURE:
      return { ...state, loading: true };
    case CHANGE_STRUCTURE_SUCCESS:
      return {
        ...state,
        structureFile: action.payload.structureFile.replace('.json', ''),
        dataStructure: action.payload.dataStructure,
      };
    case CHANGE_STRUCTURE_FAILED:
      return {
        ...INIT_STATE,
        errorState: true,
        errorMessage: action.payload.message,
      };

    case MANIPULATE_STRUCTURE_HEADER: {
      if (action.payload.action === 'add') {
        return {
          ...state,
          dataStructure: {
            ...state.dataStructure,
            [action.payload.label]: [],
          },
        };
      }
      const headerToRemove = action.payload.label;
      const {
        [headerToRemove]: {},
        ...removedStructure
      } = state.dataStructure;
      return { ...state, dataStructure: removedStructure };
    }
    case MANIPULATE_STRUCTURE_FIELD: {
      if (action.payload.action === 'add') {
        return {
          ...state,
          dataStructure: {
            ...state.dataStructure,
            [action.payload.header]: state.dataStructure[action.payload.header].concat(
              action.payload.label
            ),
          },
        };
      }
      const indexToRemove = state.dataStructure[action.payload.header].indexOf(
        action.payload.label
      );
      return {
        ...state,
        dataStructure: {
          ...state.dataStructure,
          [action.payload.header]: [
            ...state.dataStructure[action.payload.header].slice(0, indexToRemove),
            ...state.dataStructure[action.payload.header].slice(indexToRemove + 1),
          ],
        },
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
