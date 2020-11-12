import { ActionCreator } from 'redux';
import {
  SORT_STRUCTURE,
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
import { StructureActionTypes } from './action.types';

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
  isAutosave: boolean,
  fileName: string
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

export const manipulateStructureHeader: ActionCreator<StructureActionTypes> = (
  name: string,
  action: StructureObjectAction
) => ({
  type: MANIPULATE_STRUCTURE_HEADER,
  payload: { name, action },
});

export const manipulateStructureField: ActionCreator<StructureActionTypes> = (
  name: string,
  field: string,
  action: StructureObjectAction
) => ({
  type: MANIPULATE_STRUCTURE_FIELD,
  payload: { name, field, action },
});

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

export const sortStructure: ActionCreator<StructureActionTypes> = (
  oldIndex: number,
  newIndex: number,
  whichHeader?: string
) => ({
  type: SORT_STRUCTURE,
  payload: { oldIndex, newIndex, whichHeader },
});
