import { ActionCreator } from 'redux';
import {
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
} from '../../redux.types';
import { StructureObject } from '../../../types';
import { StructureActionTypes } from '../action.types';

export const initStructure: ActionCreator<StructureActionTypes> = (path: string) => ({
  type: INITIALIZE_STRUCTURE,
  payload: { path },
});

export const initStructureSuccess: ActionCreator<StructureActionTypes> = (
  structure: StructureObject,
  allStructures: Array<any>
) => ({
  type: INITIALIZE_STRUCTURE_SUCCESS,
  payload: { structure, allStructures },
});

export const initStructureFailed: ActionCreator<StructureActionTypes> = (
  message?: string
) => ({
  type: INITIALIZE_STRUCTURE_FAILED,
  payload: { message },
});
