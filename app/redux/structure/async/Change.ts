import { ActionCreator } from 'redux';
import {
  CHANGE_STRUCTURE,
  CHANGE_STRUCTURE_SUCCESS,
  CHANGE_STRUCTURE_FAILED,
} from '../../redux.types';
import { StructureObject } from '../../../types';
import { StructureActionTypes } from '../action.types';

export const changeStructure: ActionCreator<StructureActionTypes> = (
  path: string,
  structureFile: string
) => ({
  type: CHANGE_STRUCTURE,
  payload: { path, structureFile },
});

export const changeStructureSuccess: ActionCreator<StructureActionTypes> = (
  dataStructure: StructureObject,
  structureFile: string
) => ({
  type: CHANGE_STRUCTURE_SUCCESS,
  payload: { dataStructure, structureFile },
});

export const changeStructureFailed: ActionCreator<StructureActionTypes> = (
  message: string
) => ({
  type: CHANGE_STRUCTURE_FAILED,
  payload: { message },
});
