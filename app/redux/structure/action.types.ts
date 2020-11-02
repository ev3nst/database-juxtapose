import {
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
} from '../redux.types';

interface initStructure {
  type: typeof INITIALIZE_STRUCTURE;
  payload: null;
}

interface initStructureSuccess {
  type: typeof INITIALIZE_STRUCTURE_SUCCESS;
  payload: { structure: any };
}

interface saveStructure {
  type: typeof SAVE_STRUCTURE;
  payload: { structure: any };
}

interface saveStructureSuccess {
  type: typeof SAVE_STRUCTURE_SUCCESS;
  payload: null;
}

export type StructureActionTypes =
  | initStructure
  | initStructureSuccess
  | saveStructure
  | saveStructureSuccess;
