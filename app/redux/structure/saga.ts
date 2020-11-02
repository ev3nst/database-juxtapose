import * as fs from 'fs';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_STRUCTURE } from '../redux.types';
import {
  STRUCTURE_AUTOSAVE_FILE,
} from '../../utils/constants';
import {
  initStructureSuccess,
  initStructureFailed,
} from '../actions';
import { UserConfig } from '../../types/settings.types';

// -------------------- Configure Structure Folder & Files --------------------
function configureStructureFiles(userConfig: UserConfig) {
  if (!fs.existsSync(userConfig.paths.structures)) {
    fs.mkdirSync(userConfig.paths.structures);
  }

  if (!fs.existsSync(userConfig.paths.structures + STRUCTURE_AUTOSAVE_FILE)) {
    fs.writeFileSync(
      userConfig.paths.structures + STRUCTURE_AUTOSAVE_FILE,
      null
    );
    return null;
  }

  const FileContents = fs.readFileSync(
    userConfig.paths.structures + STRUCTURE_AUTOSAVE_FILE,
    'utf8'
  );
  const data = JSON.parse(FileContents);
  return data;
}

type StructurePayload = {
  payload: {
    userConfig: UserConfig;
  };
  type: string;
};
function* initStructure({ payload }: StructurePayload) {
  try {
    const response = yield call(configureStructureFiles(payload.userConfig));
    yield put(initStructureSuccess(response));
  } catch (error) {
    yield put(initStructureFailed(error));
  }
}
export function* watchinitStructure() {
  yield takeEvery(INITIALIZE_STRUCTURE, initStructure);
}

export default function* rootSaga() {
  yield all([fork(watchinitStructure)]);
}
