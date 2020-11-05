import { ActionCreator } from 'redux';
import {
  SAVE_MIGRATION,
  SAVE_MIGRATION_SUCCESS,
  INITIALIZE_MIGRATION,
  INITIALIZE_MIGRATION_SUCCESS,
  INITIALIZE_MIGRATION_FAILED,
} from '../redux.types';
import { MigrationActionTypes } from './action.types';

export const initMigration: ActionCreator<MigrationActionTypes> = (path: string) => ({
  type: INITIALIZE_MIGRATION,
  payload: { path },
});

export const initMigrationSuccess: ActionCreator<MigrationActionTypes> = (
  migration: any
) => ({
  type: INITIALIZE_MIGRATION_SUCCESS,
  payload: { migration },
});

export const initMigrationFailed: ActionCreator<MigrationActionTypes> = (
  message?: string
) => ({
  type: INITIALIZE_MIGRATION_FAILED,
  payload: { message },
});

export const saveMigration: ActionCreator<MigrationActionTypes> = (migration: any) => ({
  type: SAVE_MIGRATION,
  payload: { migration },
});

export const saveMigrationSuccess: ActionCreator<MigrationActionTypes> = () => ({
  type: SAVE_MIGRATION_SUCCESS,
  payload: null,
});
