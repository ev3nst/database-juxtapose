import { ActionCreator } from 'redux';
import {
  INITIALIZE_INTEGRATION,
  INITIALIZE_INTEGRATION_SUCCESS,
  INITIALIZE_INTEGRATION_FAILED,
} from '../../redux.types';
import { IntegrationObject } from '../../../types';
import { IntegrationActionTypes } from '../action.types';

export const initIntegration: ActionCreator<IntegrationActionTypes> = (path: string) => ({
  type: INITIALIZE_INTEGRATION,
  payload: { path },
});

export const initIntegrationSuccess: ActionCreator<IntegrationActionTypes> = (
  integration: IntegrationObject
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
