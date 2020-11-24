import { ActionCreator } from 'redux';
import {
  DELETE_STRUCTURE,
  DELETE_STRUCTURE_SUCCESS,
  DELETE_STRUCTURE_FAILED,
} from '../../redux.types';
import { StructureActionTypes } from '../action.types';

export const deleteStructure: ActionCreator<StructureActionTypes> = (
  path: string,
  structureFile: string
) => ({
  type: DELETE_STRUCTURE,
  payload: { path, structureFile },
});

export const deleteStructureSuccess: ActionCreator<StructureActionTypes> = (
  structureFile: string
) => ({
  type: DELETE_STRUCTURE_SUCCESS,
  payload: { structureFile },
});

export const deleteStructureFailed: ActionCreator<StructureActionTypes> = (
  message: string
) => ({
  type: DELETE_STRUCTURE_FAILED,
  payload: { message },
});
