import {
  SORT_STRUCTURE,
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  SAVE_STRUCTURE_FAILED,
  CHANGE_STRUCTURE,
  CHANGE_STRUCTURE_SUCCESS,
  CHANGE_STRUCTURE_FAILED,
  ADD_OR_REMOVE_S_HEADER,
  ADD_OR_REMOVE_S_FIELD,
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
} from '../redux.types';
import { StructureObjectAction, StructureObject } from '../../types';

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

// add or remove data
export interface AddOrRemoveHeader {
  type: typeof ADD_OR_REMOVE_S_HEADER;
  payload: {
    name: string;
    action: StructureObjectAction;
  };
}
export interface AddOrRemoveContent {
  type: typeof ADD_OR_REMOVE_S_FIELD;
  payload: {
    name: string;
    field: string;
    action: StructureObjectAction;
  };
}

// sort data
export interface SortStructure {
  type: typeof SORT_STRUCTURE;
  payload: {
    oldIndex: number;
    newIndex: number;
    whichHeader?: string;
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
  | AddOrRemoveHeader
  | AddOrRemoveContent
  | SortStructure;
