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
  META_CHANGE,
} from '../redux.types';
import { InteractiveResponder, StructureObject } from '../../types';
import { StructureActionTypes } from './action.types';
import { LOADING, ERROR, INITIALIZES, EMPTY_STRUCTURE } from '../../utils/constants';
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
  dataStructure: EMPTY_STRUCTURE,
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
      const { oldIndex, newIndex, itemName } = action.payload;
      let sortedArray!: StructureObject;

      if (itemName === undefined) {
        sortedArray = {
          ...state.dataStructure,
          structure: arrayMove(state.dataStructure.structure, oldIndex, newIndex),
        };
      } else {
        const headerIndex = findObjectIndex(
          state.dataStructure.structure,
          'itemName',
          itemName
        );
        sortedArray = {
          ...state.dataStructure,
          structure: Object.assign([...state.dataStructure.structure], {
            [headerIndex]: {
              itemName,
              items: arrayMove(
                state.dataStructure.structure[headerIndex].items,
                oldIndex,
                newIndex
              ),
            },
          }),
        };
      }

      return {
        ...state,
        dataStructure: sortedArray,
      };
    }

    case META_CHANGE:
      return {
        ...state,
        dataStructure: {
          ...state.dataStructure,
          [action.payload.metaName]: action.payload.value,
        },
      };

    case ADD_OR_REMOVE_S_HEADER: {
      if (action.payload.action === 'add') {
        const newItem = {
          itemName: action.payload.itemName,
          items: [],
        };
        return {
          ...state,
          dataStructure: {
            ...state.dataStructure,
            structure: state.dataStructure.structure.concat(newItem),
          },
        };
      }

      const indexToRemove = findObjectIndex(
        state.dataStructure.structure,
        'itemName',
        action.payload.itemName
      );
      return {
        ...state,
        dataStructure: {
          ...state.dataStructure,
          structure: [
            ...state.dataStructure.structure.slice(0, indexToRemove),
            ...state.dataStructure.structure.slice(indexToRemove + 1),
          ],
        },
      };
    }

    case ADD_OR_REMOVE_S_FIELD: {
      if (action.payload.action === 'add') {
        const indexToAdd = findObjectIndex(
          state.dataStructure.structure,
          'itemName',
          action.payload.itemName
        );

        return {
          ...state,
          dataStructure: {
            ...state.dataStructure,
            structure: Object.assign([...state.dataStructure.structure], {
              [indexToAdd]: {
                itemName: action.payload.itemName,
                items: [
                  ...state.dataStructure.structure[indexToAdd].items,
                  {
                    fieldName: action.payload.fieldName,
                    dataType: 'Any',
                    required: false,
                    defaultValue: null,
                  },
                ],
              },
            }),
          },
        };
      }

      const indexToRemoveFrom = findObjectIndex(
        state.dataStructure.structure,
        'itemName',
        action.payload.itemName
      );

      const indexToRemove = findObjectIndex(
        state.dataStructure.structure[indexToRemoveFrom].items,
        'fieldName',
        action.payload.fieldName
      );

      return {
        ...state,
        dataStructure: {
          ...state.dataStructure,
          structure: Object.assign([...state.dataStructure.structure], {
            [indexToRemoveFrom]: {
              itemName: action.payload.itemName,
              items: [
                ...state.dataStructure.structure[indexToRemoveFrom].items.slice(
                  0,
                  indexToRemove
                ),
                ...state.dataStructure.structure[indexToRemoveFrom].items.slice(
                  indexToRemove + 1
                ),
              ],
            },
          }),
        },
      };
    }

    case MANIPULATE_FIELD_DATA: {
      const headerToModify = findObjectIndex(
        state.dataStructure.structure,
        'itemName',
        action.payload.itemName
      );

      const fieldToModify = findObjectIndex(
        state.dataStructure.structure[headerToModify].items,
        'fieldName',
        action.payload.fieldName
      );

      const rawItems = Object.assign([
        ...state.dataStructure.structure[headerToModify].items,
      ]);
      rawItems[fieldToModify][action.payload.key] = action.payload.value;

      return {
        ...state,
        dataStructure: {
          ...state.dataStructure,
          structure: Object.assign([...state.dataStructure.structure], {
            [headerToModify]: {
              itemName: action.payload.itemName,
              items: rawItems,
            },
          }),
        },
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
