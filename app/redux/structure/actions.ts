import { ActionCreator } from 'redux';
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
import { StructureObjectAction } from '../../types/structure.types';
import { StructureActionTypes } from './action.types';

export const initStructure: ActionCreator<StructureActionTypes> = (
  path: string
) => ({
  type: INITIALIZE_STRUCTURE,
  payload: { path },
});

export const initStructureSuccess: ActionCreator<StructureActionTypes> = (
  structure: any
) => ({
  type: INITIALIZE_STRUCTURE_SUCCESS,
  payload: { structure },
});

export const initStructureFailed: ActionCreator<StructureActionTypes> = (
  message?: string
) => ({
  type: INITIALIZE_STRUCTURE_FAILED,
  payload: { message },
});

export const saveStructure: ActionCreator<StructureActionTypes> = (
  path: string,
  newStructure: any,
  isAutosave: Boolean
) => ({
  type: SAVE_STRUCTURE,
  payload: { path, newStructure, isAutosave },
});

export const saveStructureSuccess: ActionCreator<StructureActionTypes> = () => ({
  type: SAVE_STRUCTURE_SUCCESS,
  payload: null,
});

export const saveStructureFailed: ActionCreator<StructureActionTypes> = (
  message?: string
) => ({
  type: SAVE_STRUCTURE_FAILED,
  payload: { message },
});

export const manipulateStructureHeader: ActionCreator<StructureActionTypes> = (
  label: string,
  action: StructureObjectAction
) => ({
  type: MANIPULATE_STRUCTURE_HEADER,
  payload: { label, action },
});

export const manipulateStructureContent: ActionCreator<StructureActionTypes> = (
  label: string,
  action: StructureObjectAction,
  header: string
) => ({
  type: MANIPULATE_STRUCTURE_CONTENT,
  payload: { label, action, header },
});
