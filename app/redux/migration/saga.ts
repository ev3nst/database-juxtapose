import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_MIGRATION } from '../redux.types';
import {
  MIGRATION_AUTOSAVE_FILE,
  MIGRATION_AUTOSAVE_NAME,
  PAGINATION_LIMIT,
} from '../../utils/constants';
import { getFolderWithPagination, getJsonFile } from '../../utils/functions';
import { initMigrationSuccess, initMigrationFailed } from '../actions';

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

export default function* rootSaga() {
  yield all([fork(watchinitMigration)]);
}
