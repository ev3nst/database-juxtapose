import * as fs from 'fs';
import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_STRUCTURE, SAVE_STRUCTURE } from '../redux.types';
import { StructureItem } from '../../types';
import { STRUCTURE_AUTOSAVE_FILE } from '../../utils/constants';
import {
  initStructureSuccess,
  initStructureFailed,
  saveStructureSuccess,
  saveStructureFailed,
} from '../actions';

// -------------------- Configure Structure Folder & Files --------------------
type ReturnInitStructure = {
  status: boolean;
  data?: any;
  error?: any;
};
async function configureStructureFiles(path: string): Promise<ReturnInitStructure> {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    if (!fs.existsSync(path + STRUCTURE_AUTOSAVE_FILE)) {
      fs.writeFileSync(path + STRUCTURE_AUTOSAVE_FILE, '{}');
      return {
        status: true,
        data: {},
      };
    }

    const FileContents = fs.readFileSync(path + STRUCTURE_AUTOSAVE_FILE, 'utf8');
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

type StructurePayload = {
  payload: {
    path: string;
  };
  type: string;
};
function* initStructure({ payload }: StructurePayload) {
  try {
    const response = yield call(configureStructureFiles, payload.path);
    if (response.status === true) {
      yield put(initStructureSuccess(response.data));
      return;
    }

    yield put(initStructureFailed(response.error));
  } catch (error) {
    yield put(initStructureFailed(error.toString()));
  }
}
export function* watchinitStructure() {
  yield takeEvery(INITIALIZE_STRUCTURE, initStructure);
}

// -------------------- Save New Structure File --------------------
async function saveStructureFile(path: string, newStructure: any, isAutosave: boolean) {
  if (isAutosave === true) {
    fs.writeFileSync(path + STRUCTURE_AUTOSAVE_FILE, JSON.stringify(newStructure));
  } else {
    fs.writeFileSync(path, JSON.stringify(newStructure));
  }
}

type NewStructurePayload = {
  payload: {
    path: string;
    newStructure: StructureItem;
    isAutosave: boolean;
  };
  type: string;
};
function* saveStructure({ payload }: NewStructurePayload) {
  try {
    yield call(saveStructureFile, payload.path, payload.newStructure, payload.isAutosave);
    yield put(saveStructureSuccess());
  } catch (error) {
    yield put(saveStructureFailed(error));
  }
}
export function* watchsaveStructure() {
  yield takeLatest(SAVE_STRUCTURE, saveStructure);
}

export default function* rootSaga() {
  yield all([fork(watchinitStructure), fork(watchsaveStructure)]);
}
