import { ActionCreator } from 'redux';
import {
  SAVE_INTEGRATION,
  SAVE_INTEGRATION_SUCCESS,
  SAVE_INTEGRATION_FAILED,
} from '../../redux.types';
import { IntegrationObject } from '../../../types';
import { IntegrationActionTypes } from '../action.types';

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
