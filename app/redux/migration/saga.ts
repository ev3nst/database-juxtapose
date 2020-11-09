import * as fs from 'fs';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_MIGRATION } from '../redux.types';
import { MIGRATION_AUTOSAVE_FILE } from '../../utils/constants';
import { initMigrationSuccess, initMigrationFailed } from '../actions';

// -------------------- Configure Migration Folder & Files --------------------
type ReturnInitMigration = {
  status: boolean;
  data?: any;
  error?: any;
};
async function configureMigrationFiles(path: string): Promise<ReturnInitMigration> {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    if (!fs.existsSync(path + MIGRATION_AUTOSAVE_FILE)) {
      fs.writeFileSync(path + MIGRATION_AUTOSAVE_FILE, '{}');
      return {
        status: true,
        data: {},
      };
    }

    const FileContents = fs.readFileSync(path + MIGRATION_AUTOSAVE_FILE, 'utf8');
    const data = JSON.parse(FileContents);
    if (data !== undefined || data !== null || data !== '') {
      return {
        status: true,
        data,
      };
    }
    return { status: false, error: 'Corrupted json.' };
  } catch (error) {
    return { status: false, error: error.toString() };
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
    if (response.status === true) {
      yield put(initMigrationSuccess(response.data));
      return;
    }

    yield put(initMigrationFailed(response.error));
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
