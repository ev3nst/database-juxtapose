import {
  SORT_STRUCTURE,
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  SAVE_STRUCTURE_FAILED,
  CHANGE_STRUCTURE,
  CHANGE_STRUCTURE_SUCCESS,
  CHANGE_STRUCTURE_FAILED,
  DELETE_STRUCTURE,
  DELETE_STRUCTURE_SUCCESS,
  DELETE_STRUCTURE_FAILED,
  ADD_OR_REMOVE_S_HEADER,
  ADD_OR_REMOVE_S_FIELD,
  MANIPULATE_FIELD_DATA,
  META_CHANGE,
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
} from '../redux.types';
import {
  StructureObjectAction,
  StructureObject,
  StructureFieldKeys,
  StructureFieldDataTypes,
} from '../../types';

// init
export interface InitStructure {
  type: typeof INITIALIZE_STRUCTURE;
  payload: { path: string };
}

export interface InitStructureSuccess {
  type: typeof INITIALIZE_STRUCTURE_SUCCESS;
  payload: { structure: StructureObject; allStructures: Array<any> };
}

export interface InitStructureFailed {
  type: typeof INITIALIZE_STRUCTURE_FAILED;
  payload: { message?: string };
}

// save
export interface SaveStructure {
  type: typeof SAVE_STRUCTURE;
  payload: {
    path: string;
    dataStructure: StructureObject;
    fileName: string;
    isAutosave: boolean;
  };
}

export interface SaveStructureSuccess {
  type: typeof SAVE_STRUCTURE_SUCCESS;
  payload: { isAutosave: boolean; fileName: string };
}

export interface SaveStructureFailed {
  type: typeof SAVE_STRUCTURE_FAILED;
  payload: { message?: string };
}

// change file
export interface ChangeStructure {
  type: typeof CHANGE_STRUCTURE;
  payload: {
    path: string;
    structureFile: string;
  };
}

export interface ChangeStructureSuccess {
  type: typeof CHANGE_STRUCTURE_SUCCESS;
  payload: { dataStructure: StructureObject; structureFile: string };
}

export interface ChangeStructureFailed {
  type: typeof CHANGE_STRUCTURE_FAILED;
  payload: { message: string };
}

export interface DeleteStructure {
  type: typeof DELETE_STRUCTURE;
  payload: {
    path: string;
    structureFile: string;
  };
}

export interface DeleteStructureSuccess {
  type: typeof DELETE_STRUCTURE_SUCCESS;
  payload: { structureFile: string };
}

export interface DeleteStructureFailed {
  type: typeof DELETE_STRUCTURE_FAILED;
  payload: { message: string };
}

// add or remove data
export interface AddOrRemoveHeader {
  type: typeof ADD_OR_REMOVE_S_HEADER;
  payload: {
    itemName: string;
    action: StructureObjectAction;
  };
}
export interface AddOrRemoveField {
  type: typeof ADD_OR_REMOVE_S_FIELD;
  payload: {
    itemName: string;
    fieldName: string;
    action: StructureObjectAction;
  };
}

// sort data
export interface SortStructure {
  type: typeof SORT_STRUCTURE;
  payload: {
    oldIndex: number;
    newIndex: number;
    itemName?: string;
  };
}

// manipulate field keys
export interface ManipulateFieldData {
  type: typeof MANIPULATE_FIELD_DATA;
  payload: {
    itemName: string;
    fieldName: string;
    key: StructureFieldKeys;
    value: string | StructureFieldDataTypes | boolean;
  };
}

// change structure meta data
export type MetaNames = 'name' | 'description';
export interface MetaChange {
  type: typeof META_CHANGE;
  payload: {
    value: string;
    metaName: MetaNames;
  };
}

export type StructureActionTypes =
  | InitStructure
  | InitStructureSuccess
  | InitStructureFailed
  | SaveStructure
  | SaveStructureSuccess
  | SaveStructureFailed
  | ChangeStructure
  | ChangeStructureSuccess
  | ChangeStructureFailed
  | DeleteStructure
  | DeleteStructureSuccess
  | DeleteStructureFailed
  | AddOrRemoveHeader
  | AddOrRemoveField
  | SortStructure
  | ManipulateFieldData
  | MetaChange;
