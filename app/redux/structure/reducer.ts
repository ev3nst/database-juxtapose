import arrayMove from 'array-move';
import {
  SORT_STRUCTURE,
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  CHANGE_STRUCTURE,
  CHANGE_STRUCTURE_SUCCESS,
  CHANGE_STRUCTURE_FAILED,
  DELETE_STRUCTURE,
  DELETE_STRUCTURE_SUCCESS,
  DELETE_STRUCTURE_FAILED,
  ADD_OR_REMOVE_S_HEADER,
  ADD_OR_REMOVE_S_FIELD,
  MANIPULATE_FIELD_DATA,
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
} from '../redux.types';
import { InteractiveResponder, StructureObject } from '../../types';
import { StructureActionTypes } from './action.types';
import { LOADING, ERROR, INITIALIZES } from '../../utils/constants';
import { findObjectIndex } from '../../utils/functions';

export interface StructureState extends InteractiveResponder {
  autosaveLoading: boolean;
  allStructures: Array<string>;
  dataStructure: StructureObject;
  structureFile: string;
}

const INIT_STATE: StructureState = {
  ...ERROR,
  ...LOADING,
  ...INITIALIZES,
  autosaveLoading: false,
  allStructures: [],
  dataStructure: [],
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
      console.log(
        {
          ...state,
          loading: false,
          autosaveLoading: false,
          structureFile: action.payload.fileName,
          allStructures:
            action.payload.isAutosave === true
              ? state.allStructures
              : state.allStructures.concat(action.payload.fileName),
        },
        'SAV?E'
      );
      return {
        ...state,
        loading: false,
        autosaveLoading: false,
        structureFile: action.payload.fileName,
        allStructures:
          action.payload.isAutosave === true
            ? state.allStructures
            : state.allStructures.concat(action.payload.fileName),
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

    case DELETE_STRUCTURE:
      return { ...state, loading: true };

    case DELETE_STRUCTURE_SUCCESS: {
      const indexToRemove = state.allStructures.indexOf(action.payload.structureFile);
      return {
        ...state,
        allStructures: [
          ...state.allStructures.slice(0, indexToRemove),
          ...state.allStructures.slice(indexToRemove + 1),
        ],
      };
    }

    case DELETE_STRUCTURE_FAILED:
      return {
        ...INIT_STATE,
        errorState: true,
        errorMessage: action.payload.message,
      };

    case SORT_STRUCTURE: {
      const { oldIndex, newIndex, whichHeader } = action.payload;
      let sortedArray!: StructureObject;

      if (whichHeader === undefined) {
        sortedArray = arrayMove(state.dataStructure, oldIndex, newIndex);
      } else {
        const headerIndex = findObjectIndex(state.dataStructure, 'name', whichHeader);
        sortedArray = Object.assign([...state.dataStructure], {
          [headerIndex]: {
            name: whichHeader,
            items: arrayMove(state.dataStructure[headerIndex].items, oldIndex, newIndex),
          },
        });
      }

      return {
        ...state,
        dataStructure: sortedArray,
      };
    }

    case ADD_OR_REMOVE_S_HEADER: {
      if (action.payload.action === 'add') {
        const newItem = {
          name: action.payload.name,
          items: [],
        };
        return {
          ...state,
          dataStructure: state.dataStructure.concat(newItem),
        };
      }

      const indexToRemove = findObjectIndex(
        state.dataStructure,
        'name',
        action.payload.name
      );
      return {
        ...state,
        dataStructure: [
          ...state.dataStructure.slice(0, indexToRemove),
          ...state.dataStructure.slice(indexToRemove + 1),
        ],
      };
    }

    case ADD_OR_REMOVE_S_FIELD: {
      if (action.payload.action === 'add') {
        const indexToAdd = findObjectIndex(
          state.dataStructure,
          'name',
          action.payload.name
        );

        return {
          ...state,
          dataStructure: Object.assign([...state.dataStructure], {
            [indexToAdd]: {
              name: action.payload.name,
              items: [
                ...state.dataStructure[indexToAdd].items,
                {
                  name: action.payload.field,
                  dataType: 'Any',
                  required: false,
                  defaultValue: null,
                },
              ],
            },
          }),
        };
      }

      const indexToRemoveFrom = findObjectIndex(
        state.dataStructure,
        'name',
        action.payload.name
      );

      const indexToRemove = findObjectIndex(
        state.dataStructure[indexToRemoveFrom].items,
        'name',
        action.payload.field
      );

      return {
        ...state,
        dataStructure: Object.assign([...state.dataStructure], {
          [indexToRemoveFrom]: {
            name: action.payload.name,
            items: [
              ...state.dataStructure[indexToRemoveFrom].items.slice(0, indexToRemove),
              ...state.dataStructure[indexToRemoveFrom].items.slice(indexToRemove + 1),
            ],
          },
        }),
      };
    }

    case MANIPULATE_FIELD_DATA: {
      const headerToModify = findObjectIndex(
        state.dataStructure,
        'name',
        action.payload.whichHeader
      );

      const fieldToModify = findObjectIndex(
        state.dataStructure[headerToModify].items,
        'name',
        action.payload.field
      );

      const rawItems = Object.assign([...state.dataStructure[headerToModify].items]);
      rawItems[fieldToModify][action.payload.key] = action.payload.value;

      return {
        ...state,
        dataStructure: Object.assign([...state.dataStructure], {
          [headerToModify]: {
            name: action.payload.whichHeader,
            items: rawItems,
          },
        }),
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
