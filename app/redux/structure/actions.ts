import { ActionCreator } from 'redux';
import {
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  INITIALIZE_STRUCTURE_FAILED,
} from '../redux.types';
import { StructureActionTypes } from './action.types';

export const initStructure: ActionCreator<StructureActionTypes> = () => ({
  type: INITIALIZE_STRUCTURE,
  payload: null,
});

export const initStructureSuccess: ActionCreator<StructureActionTypes> = () => ({
  type: INITIALIZE_STRUCTURE_SUCCESS,
  payload: null,
});

export const initStructureFailed: ActionCreator<StructureActionTypes> = (
  message?: String
) => ({
  type: INITIALIZE_STRUCTURE_FAILED,
  payload: { message },
});

export const saveStructure: ActionCreator<StructureActionTypes> = (
  structure: any
) => ({
  type: SAVE_STRUCTURE,
  payload: { structure },
});

export const saveStructureSuccess: ActionCreator<StructureActionTypes> = () => ({
  type: SAVE_STRUCTURE_SUCCESS,
  payload: null,
});
