import { ActionCreator } from 'redux';
import {
  INITIALIZE_STRUCTURE,
  INITIALIZE_STRUCTURE_SUCCESS,
  SAVE_STRUCTURE,
  SAVE_STRUCTURE_SUCCESS,
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

export const saveStructure: ActionCreator<StructureActionTypes> = () => ({
  type: SAVE_STRUCTURE,
  payload: null,
});

export const saveStructureSuccess: ActionCreator<StructureActionTypes> = () => ({
  type: SAVE_STRUCTURE_SUCCESS,
  payload: null,
});
