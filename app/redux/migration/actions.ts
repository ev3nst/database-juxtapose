import { ActionCreator } from 'redux';
import {
  SAVE_MIGRATION,
  SAVE_MIGRATION_SUCCESS,
  SAVE_MIGRATION_FAILED,
  CHANGE_MIGRATION,
  CHANGE_MIGRATION_SUCCESS,
  CHANGE_MIGRATION_FAILED,
  INITIALIZE_MIGRATION,
  INITIALIZE_MIGRATION_SUCCESS,
  INITIALIZE_MIGRATION_FAILED,
} from '../redux.types';
import { MigrationObject } from '../../types';
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

export const saveMigration: ActionCreator<MigrationActionTypes> = (
  path: string,
  dataMigration: MigrationObject,
  fileName: string,
  isAutosave: boolean
) => ({
  type: SAVE_MIGRATION,
  payload: { path, dataMigration, fileName, isAutosave },
});

export const saveMigrationSuccess: ActionCreator<MigrationActionTypes> = (
  isAutosave: boolean,
  fileName: string
) => ({
  type: SAVE_MIGRATION_SUCCESS,
  payload: { isAutosave, fileName },
});

export const saveMigrationFailed: ActionCreator<MigrationActionTypes> = (
  message?: string
) => ({
  type: SAVE_MIGRATION_FAILED,
  payload: { message },
});

export const changeMigration: ActionCreator<MigrationActionTypes> = (
  path: string,
  migrationFile: string
) => ({
  type: CHANGE_MIGRATION,
  payload: { path, migrationFile },
});

export const changeMigrationSuccess: ActionCreator<MigrationActionTypes> = (
  dataMigration: MigrationObject,
  migrationFile: string
) => ({
  type: CHANGE_MIGRATION_SUCCESS,
  payload: { dataMigration, migrationFile },
});

export const changeMigrationFailed: ActionCreator<MigrationActionTypes> = (
  message: string
) => ({
  type: CHANGE_MIGRATION_FAILED,
  payload: { message },
});
