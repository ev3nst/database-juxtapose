import {
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  SAVE_STRUCTURE_FAILED,
  MANIPULATE_STRUCTURE_HEADER,
  MANIPULATE_STRUCTURE_CONTENT,
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
} from '../redux.types';
import { StructureObjectAction, StructureItem } from '../../types';

export interface InitStructure {
  type: typeof INITIALIZE_STRUCTURE;
  payload: { path: string };
}

export interface InitStructureSuccess {
  type: typeof INITIALIZE_STRUCTURE_SUCCESS;
  payload: { structure: StructureItem };
}

export interface InitStructureFailed {
  type: typeof INITIALIZE_STRUCTURE_FAILED;
  payload: { message?: string };
}

export interface SaveStructure {
  type: typeof SAVE_STRUCTURE;
  payload: { path: string; newStructure: StructureItem; isAutosave: boolean };
}

export interface SaveStructureSuccess {
  type: typeof SAVE_STRUCTURE_SUCCESS;
  payload: null;
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
  type: typeof MANIPULATE_STRUCTURE_CONTENT;
  payload: {
    label: string;
    action: StructureObjectAction;
    header: string;
  };
}

export type StructureActionTypes =
  | InitStructure
  | InitStructureSuccess
  | InitStructureFailed
  | SaveStructure
  | SaveStructureSuccess
  | SaveStructureFailed
  | ManipulateStructureHeader
  | ManipulateStructureContent;
