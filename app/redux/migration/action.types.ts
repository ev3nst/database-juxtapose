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

// init
export interface InitMigration {
  type: typeof INITIALIZE_MIGRATION;
  payload: { path: string };
}

export interface InitMigrationSuccess {
  type: typeof INITIALIZE_MIGRATION_SUCCESS;
  payload: { migration: any };
}

export interface InitMigrationFailed {
  type: typeof INITIALIZE_MIGRATION_FAILED;
  payload: { message?: string };
}

// save
export interface SaveMigration {
  type: typeof SAVE_MIGRATION;
  payload: {
    path: string;
    dataMigration: MigrationObject;
    fileName: string;
    isAutosave: boolean;
  };
}

export interface SaveMigrationSuccess {
  type: typeof SAVE_MIGRATION_SUCCESS;
  payload: { isAutosave: boolean; fileName: string };
}

export interface SaveMigrationFailed {
  type: typeof SAVE_MIGRATION_FAILED;
  payload: { message?: string };
}

// change file
export interface ChangeMigration {
  type: typeof CHANGE_MIGRATION;
  payload: {
    path: string;
    migrationFile: string;
  };
}

export interface ChangeMigrationSuccess {
  type: typeof CHANGE_MIGRATION_SUCCESS;
  payload: { dataMigration: MigrationObject; migrationFile: string };
}

export interface ChangeMigrationFailed {
  type: typeof CHANGE_MIGRATION_FAILED;
  payload: { message: string };
}

export type MigrationActionTypes =
  | InitMigration
  | InitMigrationSuccess
  | InitMigrationFailed
  | SaveMigration
  | SaveMigrationSuccess
  | SaveMigrationFailed
  | ChangeMigration
  | ChangeMigrationSuccess
  | ChangeMigrationFailed;
