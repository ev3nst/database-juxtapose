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

// init
export interface InitIntegration {
  type: typeof INITIALIZE_INTEGRATION;
  payload: { path: string };
}

export interface InitIntegrationSuccess {
  type: typeof INITIALIZE_INTEGRATION_SUCCESS;
  payload: { integration: any };
}

export interface InitIntegrationFailed {
  type: typeof INITIALIZE_INTEGRATION_FAILED;
  payload: { message?: string };
}

// save
export interface SaveIntegration {
  type: typeof SAVE_INTEGRATION;
  payload: {
    path: string;
    dataIntegration: IntegrationObject;
    fileName: string;
    isAutosave: boolean;
  };
}

export interface SaveIntegrationSuccess {
  type: typeof SAVE_INTEGRATION_SUCCESS;
  payload: { isAutosave: boolean; fileName: string };
}

export interface SaveIntegrationFailed {
  type: typeof SAVE_INTEGRATION_FAILED;
  payload: { message?: string };
}

// change file
export interface ChangeIntegration {
  type: typeof CHANGE_INTEGRATION;
  payload: {
    path: string;
    integrationFile: string;
  };
}

export interface ChangeIntegrationSuccess {
  type: typeof CHANGE_INTEGRATION_SUCCESS;
  payload: { dataIntegration: IntegrationObject; integrationFile: string };
}

export interface ChangeIntegrationFailed {
  type: typeof CHANGE_INTEGRATION_FAILED;
  payload: { message: string };
}

export type IntegrationActionTypes =
  | InitIntegration
  | InitIntegrationSuccess
  | InitIntegrationFailed
  | SaveIntegration
  | SaveIntegrationSuccess
  | SaveIntegrationFailed
  | ChangeIntegration
  | ChangeIntegrationSuccess
  | ChangeIntegrationFailed;
