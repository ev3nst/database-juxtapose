import { ActionCreator } from 'redux';
import {
  CHANGE_INTEGRATION,
  CHANGE_INTEGRATION_SUCCESS,
  CHANGE_INTEGRATION_FAILED,
} from '../../redux.types';
import { IntegrationObject } from '../../../types';
import { IntegrationActionTypes } from '../action.types';

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
