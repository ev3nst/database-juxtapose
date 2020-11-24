import { ActionCreator } from 'redux';
import {
  SORT_STRUCTURE,
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  SAVE_STRUCTURE_FAILED,
  CHANGE_STRUCTURE,
  CHANGE_STRUCTURE_SUCCESS,
  CHANGE_STRUCTURE_FAILED,
  DELETE_STRUCTURE,
  DELETE_STRUCTURE_SUCCESS,
  DELETE_STRUCTURE_FAILED,
  ADD_OR_REMOVE_S_HEADER,
  ADD_OR_REMOVE_S_FIELD,
  MANIPULATE_FIELD_DATA,
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
  META_CHANGE,
} from '../redux.types';
import {
  StructureObjectAction,
  StructureObject,
  StructureFieldDataTypes,
  StructureFieldKeys,
} from '../../types';
import { StructureActionTypes, MetaNames } from './action.types';

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

export const addOrRemoveHeader: ActionCreator<StructureActionTypes> = (
  itemName: string,
  action: StructureObjectAction
) => ({
  type: ADD_OR_REMOVE_S_HEADER,
  payload: { itemName, action },
});

export const addOrRemoveField: ActionCreator<StructureActionTypes> = (
  itemName: string,
  fieldName: string,
  action: StructureObjectAction
) => ({
  type: ADD_OR_REMOVE_S_FIELD,
  payload: { itemName, fieldName, action },
});

export const sortStructure: ActionCreator<StructureActionTypes> = (
  oldIndex: number,
  newIndex: number,
  itemName?: string
) => ({
  type: SORT_STRUCTURE,
  payload: { oldIndex, newIndex, itemName },
});

export const manipulateFieldData: ActionCreator<StructureActionTypes> = (
  itemName: string,
  fieldName: string,
  key: StructureFieldKeys,
  value: string | StructureFieldDataTypes | boolean
) => ({
  type: MANIPULATE_FIELD_DATA,
  payload: { itemName, fieldName, key, value },
});

export const metaChange: ActionCreator<StructureActionTypes> = (
  value: string,
  metaName: MetaNames
) => ({
  type: META_CHANGE,
  payload: { value, metaName },
});
