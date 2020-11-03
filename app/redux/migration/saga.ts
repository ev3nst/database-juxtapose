import * as fs from 'fs';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_MIGRATION } from '../redux.types';
import { MIGRATION_AUTOSAVE_FILE } from '../../utils/constants';
import { initMigrationSuccess, initMigrationFailed } from '../actions';

// -------------------- Configure Migration Folder & Files --------------------
async function configureMigrationFiles(path: string) {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    if (!fs.existsSync(path + MIGRATION_AUTOSAVE_FILE)) {
      fs.writeFileSync(path + MIGRATION_AUTOSAVE_FILE, '{}');
      return {};
    }

    const FileContents = fs.readFileSync(
      path + MIGRATION_AUTOSAVE_FILE,
      'utf8'
    );
    const data = JSON.parse(FileContents);
    return data;
  } catch (error) {
    return error;
  }
}

type MigrationPayload = {
  payload: {
    path: string;
  };
  type: string;
};
function* initMigration({ payload }: MigrationPayload) {
  try {
    const response = yield call(configureMigrationFiles, payload.path);
    yield put(initMigrationSuccess(response));
  } catch (error) {
    yield put(initMigrationFailed(error));
  }
}
export function* watchinitMigration() {
  yield takeEvery(INITIALIZE_MIGRATION, initMigration);
}

export default function* rootSaga() {
  yield all([fork(watchinitMigration)]);
}
