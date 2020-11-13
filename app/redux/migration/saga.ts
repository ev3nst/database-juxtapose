import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { NotificationManager } from '../../components';
import { INITIALIZE_MIGRATION, CHANGE_MIGRATION, SAVE_MIGRATION } from '../redux.types';
import { MigrationObject } from '../../types';
import {
  MIGRATION_AUTOSAVE_FILE,
  MIGRATION_AUTOSAVE_NAME,
  PAGINATION_LIMIT,
  NOTIFICATION_TIMEOUT,
} from '../../utils/constants';
import {
  getFolderWithPagination,
  getJsonFile,
  saveJsonFile,
} from '../../utils/functions';
import {
  initMigrationSuccess,
  initMigrationFailed,
  saveMigrationSuccess,
  saveMigrationFailed,
  changeMigrationSuccess,
  changeMigrationFailed,
} from '../actions';

// -------------------- Configure Migration Folder & Files --------------------
type MigrationPayload = {
  payload: {
    path: string;
  };
  type: string;
};
function* initMigration({ payload }: MigrationPayload) {
  try {
    const migrationList = yield call(
      getFolderWithPagination,
      payload.path,
      0,
      PAGINATION_LIMIT
    );

    const autosaveFile = yield call(getJsonFile, payload.path, MIGRATION_AUTOSAVE_FILE);

    if (autosaveFile.status === true && migrationList.status === true) {
      const autosaveIndex = migrationList.files.indexOf(MIGRATION_AUTOSAVE_NAME);
      if (autosaveIndex > -1) {
        migrationList.files.splice(autosaveIndex, 1);
      }

      yield put(initMigrationSuccess(autosaveFile.data, migrationList.files));
      return;
    }

    yield put(
      initMigrationFailed(`Errors: 1. ${autosaveFile.error} 2.${migrationList.error}`)
    );
  } catch (error) {
    yield put(initMigrationFailed(error.toString()));
  }
}
export function* watchinitMigration() {
  yield takeEvery(INITIALIZE_MIGRATION, initMigration);
}

// -------------------- Save New Migration File --------------------
type NewMigrationPayload = {
  payload: {
    path: string;
    dataMigration: MigrationObject;
    isAutosave: boolean;
    fileName?: string;
  };
  type: string;
};
function* saveMigration({ payload }: NewMigrationPayload) {
  try {
    yield call(saveJsonFile, payload.path, payload.dataMigration, payload.fileName);

    // if new, reset autosave file
    if (payload.isAutosave === false) {
      yield call(saveJsonFile, payload.path, [], MIGRATION_AUTOSAVE_FILE);
    }

    yield put(saveMigrationSuccess(payload.isAutosave, payload.fileName));
  } catch (error) {
    yield put(saveMigrationFailed(error));
  }
}
export function* watchsaveMigration() {
  yield takeLatest(SAVE_MIGRATION, saveMigration);
}

// -------------------- Change Current Working Migration File --------------------
type ChangeMigrationPayload = {
  payload: {
    path: string;
    migrationFile: string;
  };
  type: string;
};
function* changeMigration({ payload }: ChangeMigrationPayload) {
  try {
    const migrationResponse = yield call(
      getJsonFile,
      payload.path,
      payload.migrationFile
    );

    if (migrationResponse.status === true) {
      yield put(changeMigrationSuccess(migrationResponse.data, payload.migrationFile));
      return;
    }

    NotificationManager.notificate({
      type: 'error',
      title: 'Migration',
      message: migrationResponse.error,
      timeOut: NOTIFICATION_TIMEOUT,
    });

    yield put(changeMigrationFailed(migrationResponse.error));
  } catch (error) {
    NotificationManager.notificate({
      type: 'error',
      title: 'Migration',
      message: error.toString(),
      timeOut: NOTIFICATION_TIMEOUT,
    });
    yield put(changeMigrationFailed(error.toString()));
  }
}
export function* watchchangeMigration() {
  yield takeLatest(CHANGE_MIGRATION, changeMigration);
}

export default function* rootSaga() {
  yield all([fork(watchinitMigration)]);
}
