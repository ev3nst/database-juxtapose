import {
  SAVE_MIGRATION,
  SAVE_MIGRATION_SUCCESS,
  INITIALIZE_MIGRATION,
  INITIALIZE_MIGRATION_SUCCESS,
  INITIALIZE_MIGRATION_FAILED,
} from '../redux.types';

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

export interface SaveMigration {
  type: typeof SAVE_MIGRATION;
  payload: { migration: any };
}

export interface SaveMigrationSuccess {
  type: typeof SAVE_MIGRATION_SUCCESS;
  payload: null;
}

export type MigrationActionTypes =
  | InitMigration
  | InitMigrationSuccess
  | InitMigrationFailed
  | SaveMigration
  | SaveMigrationSuccess;
