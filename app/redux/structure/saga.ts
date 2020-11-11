import * as fs from 'fs';
import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_STRUCTURE, SAVE_STRUCTURE } from '../redux.types';
import { StructureItem, SagaAsyncReturn } from '../../types';
import { STRUCTURE_AUTOSAVE_FILE, PAGINATION_LIMIT } from '../../utils/constants';
import {
  initStructureSuccess,
  initStructureFailed,
  saveStructureSuccess,
  saveStructureFailed,
} from '../actions';

// -------------------- Configure Structure Folder & Files --------------------
async function getStructureFolder(
  path: string,
  page?: number = 1
): Promise<SagaAsyncReturn> {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    const structures: Array<string> = [];
    fs.readdirSync(path).forEach((file) => {
      if (file.substr(file.length - 5) === '.json') {
        structures.push(file);
      }
    });

    return { status: false, data: structures };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
}

async function getStructureFile(
  path: string,
  fileName: string
): Promise<SagaAsyncReturn> {
  try {
    if (!fs.existsSync(path + fileName)) {
      fs.writeFileSync(path + fileName, '{}');
      return {
        status: true,
        data: {},
      };
    }

    const FileContents = fs.readFileSync(path + fileName, 'utf8');
    try {
      const data = JSON.parse(FileContents);
      if (data !== undefined || data !== null || data !== '') {
        return {
          status: true,
          data,
        };
      }
    } catch (error) {
      // json error
      fs.writeFileSync(path + fileName, '{}');
      return {
        status: true,
        data: {},
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
    const structureList = yield call(getStructureFolder, payload.path);
    const autosaveFile = yield call(
      getStructureFile,
      payload.path,
      STRUCTURE_AUTOSAVE_FILE
    );

    if (autosaveFile.status === true) {
      yield put(initStructureSuccess(autosaveFile.data, structureList));
      return;
    }

    yield put(initStructureFailed(autosaveFile.error));
  } catch (error) {
    yield put(initStructureFailed(error.toString()));
  }
}
export function* watchinitStructure() {
  yield takeEvery(INITIALIZE_STRUCTURE, initStructure);
}

// -------------------- Save New Structure File --------------------
async function saveStructureFile(
  path: string,
  dataStructure: any,
  isAutosave: boolean,
  fileName?: string
) {
  if (isAutosave === true) {
    fs.writeFileSync(path + STRUCTURE_AUTOSAVE_FILE, JSON.stringify(dataStructure));
  } else {
    fs.writeFileSync(`${path + fileName}.json`, JSON.stringify(dataStructure));
    fs.writeFileSync(path + STRUCTURE_AUTOSAVE_FILE, JSON.stringify({}));
  }
}

type NewStructurePayload = {
  payload: {
    path: string;
    dataStructure: StructureItem;
    isAutosave: boolean;
    fileName?: string;
  };
  type: string;
};
function* saveStructure({ payload }: NewStructurePayload) {
  try {
    yield call(
      saveStructureFile,
      payload.path,
      payload.dataStructure,
      payload.isAutosave,
      payload.fileName
    );
    yield put(saveStructureSuccess(payload.isAutosave, payload.fileName));
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
