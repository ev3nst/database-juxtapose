import { ActionCreator } from 'redux';
import {
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  SAVE_STRUCTURE_FAILED,
} from '../../redux.types';
import { StructureObject } from '../../../types';
import { StructureActionTypes } from '../action.types';

export const saveStructure: ActionCreator<StructureActionTypes> = (
  path: string,
  dataStructure: StructureObject,
  fileName: string,
  isAutosave: boolean
) => ({
  type: SAVE_STRUCTURE,
  payload: { path, dataStructure, fileName, isAutosave },
});

export const saveStructureSuccess: ActionCreator<StructureActionTypes> = (
  fileName: string,
  isAutosave: boolean
) => ({
  type: SAVE_STRUCTURE_SUCCESS,
  payload: { isAutosave, fileName },
});

export const saveStructureFailed: ActionCreator<StructureActionTypes> = (
  message?: string
) => ({
  type: SAVE_STRUCTURE_FAILED,
  payload: { message },
});
