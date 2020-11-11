import {
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  SAVE_STRUCTURE_FAILED,
  CHANGE_STRUCTURE,
  CHANGE_STRUCTURE_SUCCESS,
  CHANGE_STRUCTURE_FAILED,
  MANIPULATE_STRUCTURE_HEADER,
  MANIPULATE_STRUCTURE_FIELD,
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
} from '../redux.types';
import { StructureObjectAction, StructureObject } from '../../types';

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

export interface SaveStructure {
  type: typeof SAVE_STRUCTURE;
  payload: {
    path: string;
    dataStructure: StructureObject;
    isAutosave: boolean;
    fileName?: string;
  };
}

export interface SaveStructureSuccess {
  type: typeof SAVE_STRUCTURE_SUCCESS;
  payload: { isAutosave: boolean; fileName?: string };
}

export interface SaveStructureFailed {
  type: typeof SAVE_STRUCTURE_FAILED;
  payload: { message?: string };
}

export interface ManipulateStructureHeader {
  type: typeof MANIPULATE_STRUCTURE_HEADER;
  payload: {
    label: string;
    action: StructureObjectAction;
  };
}
export interface ManipulateStructureContent {
  type: typeof MANIPULATE_STRUCTURE_FIELD;
  payload: {
    label: string;
    action: StructureObjectAction;
    header: string;
  };
}

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
  | ManipulateStructureHeader
  | ManipulateStructureContent;
