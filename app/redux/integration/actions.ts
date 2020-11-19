import { ActionCreator } from 'redux';
import {
  SAVE_INTEGRATION,
  SAVE_INTEGRATION_SUCCESS,
  SAVE_INTEGRATION_FAILED,
  CHANGE_INTEGRATION,
  CHANGE_INTEGRATION_SUCCESS,
  CHANGE_INTEGRATION_FAILED,
  INITIALIZE_INTEGRATION,
  INITIALIZE_INTEGRATION_SUCCESS,
  INITIALIZE_INTEGRATION_FAILED,
} from '../redux.types';
import { IntegrationObject } from '../../types';
import { IntegrationActionTypes } from './action.types';

export const initIntegration: ActionCreator<IntegrationActionTypes> = (path: string) => ({
  type: INITIALIZE_INTEGRATION,
  payload: { path },
});

export const initIntegrationSuccess: ActionCreator<IntegrationActionTypes> = (
  integration: any
) => ({
  type: INITIALIZE_INTEGRATION_SUCCESS,
  payload: { integration },
});

export const initIntegrationFailed: ActionCreator<IntegrationActionTypes> = (
  message?: string
) => ({
  type: INITIALIZE_INTEGRATION_FAILED,
  payload: { message },
});

export const saveIntegration: ActionCreator<IntegrationActionTypes> = (
  path: string,
  dataIntegration: IntegrationObject,
  fileName: string,
  isAutosave: boolean
) => ({
  type: SAVE_INTEGRATION,
  payload: { path, dataIntegration, fileName, isAutosave },
});

export const saveIntegrationSuccess: ActionCreator<IntegrationActionTypes> = (
  isAutosave: boolean,
  fileName: string
) => ({
  type: SAVE_INTEGRATION_SUCCESS,
  payload: { isAutosave, fileName },
});

export const saveIntegrationFailed: ActionCreator<IntegrationActionTypes> = (
  message?: string
) => ({
  type: SAVE_INTEGRATION_FAILED,
  payload: { message },
});

export const changeIntegration: ActionCreator<IntegrationActionTypes> = (
  path: string,
  integrationFile: string
) => ({
  type: CHANGE_INTEGRATION,
  payload: { path, integrationFile },
});

export const changeIntegrationSuccess: ActionCreator<IntegrationActionTypes> = (
  dataIntegration: IntegrationObject,
  integrationFile: string
) => ({
  type: CHANGE_INTEGRATION_SUCCESS,
  payload: { dataIntegration, integrationFile },
});

export const changeIntegrationFailed: ActionCreator<IntegrationActionTypes> = (
  message: string
) => ({
  type: CHANGE_INTEGRATION_FAILED,
  payload: { message },
});
