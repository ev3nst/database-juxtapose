import {
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
} from '../redux.types';

export interface InitStructure {
  type: typeof INITIALIZE_STRUCTURE;
  payload: { path: string };
}

export interface InitStructureSuccess {
  type: typeof INITIALIZE_STRUCTURE_SUCCESS;
  payload: { structure: any };
}

export interface InitStructureFailed {
  type: typeof INITIALIZE_STRUCTURE_FAILED;
  payload: { message?: string };
}

export interface saveStructure {
  type: typeof SAVE_STRUCTURE;
  payload: { structure: any };
}

export interface saveStructureSuccess {
  type: typeof SAVE_STRUCTURE_SUCCESS;
  payload: null;
}

export type StructureActionTypes =
  | InitStructure
  | InitStructureSuccess
  | InitStructureFailed
  | saveStructure
  | saveStructureSuccess;
