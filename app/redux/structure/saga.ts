import * as fs from 'fs';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_STRUCTURE } from '../redux.types';
import { STRUCTURE_AUTOSAVE_FILE } from '../../utils/constants';
import { initStructureSuccess, initStructureFailed } from '../actions';

// -------------------- Configure Structure Folder & Files --------------------
async function configureStructureFiles(path: string) {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    if (!fs.existsSync(path + STRUCTURE_AUTOSAVE_FILE)) {
      fs.writeFileSync(path + STRUCTURE_AUTOSAVE_FILE, '{}');
      return {};
    }

    const FileContents = fs.readFileSync(
      path + STRUCTURE_AUTOSAVE_FILE,
      'utf8'
    );
    const data = JSON.parse(FileContents);
    return data;
  } catch (error) {
    return error;
  }
}

type StructurePayload = {
  payload: {
    path: string;
  };
  type: string;
};
function* initStructure({ payload }: StructurePayload) {
  try {
    const response = yield call(configureStructureFiles, payload.path);
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
