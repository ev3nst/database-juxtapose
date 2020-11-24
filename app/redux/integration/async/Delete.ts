import { ActionCreator } from 'redux';
import {
  DELETE_INTEGRATION,
  DELETE_INTEGRATION_SUCCESS,
  DELETE_INTEGRATION_FAILED,
} from '../../redux.types';
import { IntegrationActionTypes } from '../action.types';

export const deleteIntegration: ActionCreator<IntegrationActionTypes> = (
  path: string,
  integrationFile: string
) => ({
  type: DELETE_INTEGRATION,
  payload: { path, integrationFile },
});

export const deleteIntegrationSuccess: ActionCreator<IntegrationActionTypes> = (
  integrationFile: string
) => ({
  type: DELETE_INTEGRATION_SUCCESS,
  payload: { integrationFile },
});

export const deleteIntegrationFailed: ActionCreator<IntegrationActionTypes> = (
  message: string
) => ({
  type: DELETE_INTEGRATION_FAILED,
  payload: { message },
});
