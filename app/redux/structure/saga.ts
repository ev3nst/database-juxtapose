import * as fs from 'fs';
import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { CHANGE_STRUCTURE, INITIALIZE_STRUCTURE, SAVE_STRUCTURE } from '../redux.types';
import { StructureObject, SagaAsyncReturn } from '../../types';
import {
  STRUCTURE_AUTOSAVE_FILE,
  PAGINATION_LIMIT,
  NOTIFICATION_TIMEOUT,
} from '../../utils/constants';
import { NotificationManager } from '../../components/Notification';
import {
  initStructureSuccess,
  initStructureFailed,
  saveStructureSuccess,
  saveStructureFailed,
  changeStructureSuccess,
  changeStructureFailed,
} from '../actions';

// -------------------- Configure Structure Folder & Files --------------------
async function getStructureFolder(
  path: string,
  page: number = 0
): Promise<SagaAsyncReturn> {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    const offset = page * PAGINATION_LIMIT;

    let index = 0;
    const structures: Array<string> = [];
    fs.readdirSync(path).forEach((file) => {
      if (file.substr(file.length - 5) === '.json') {
        index += 1;
        if (offset + PAGINATION_LIMIT === index) {
          return;
        }
        if (offset < index && file !== STRUCTURE_AUTOSAVE_FILE) {
          structures.push(file.replace('.json', ''));
        }
      }
    });
    return { status: true, data: structures, error: '' };
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
      fs.writeFileSync(path + fileName, '[]');
      return {
        status: true,
        data: {},
        error: '',
      };
    }

    const FileContents = fs.readFileSync(path + fileName, 'utf8');
    try {
      const data = JSON.parse(FileContents);
      if (data !== undefined || data !== null || data !== '') {
        return {
          status: true,
          data,
          error: '',
        };
      }
    } catch (error) {
      // json error
      fs.writeFileSync(path + fileName, '{}');
      return {
        status: true,
        data: {},
        error: '',
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

    if (autosaveFile.status === true && structureList.status === true) {
      yield put(initStructureSuccess(autosaveFile.data, structureList.data));
      return;
    }

    yield put(
      initStructureFailed(`Errors: 1. ${autosaveFile.error} 2.${structureList.error}`)
    );
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
  fileName?: string,
  isAutosave?: boolean
) {
  fs.writeFileSync(`${path + fileName}.json`, JSON.stringify(dataStructure));
  if (isAutosave === false) {
    fs.writeFileSync(path + STRUCTURE_AUTOSAVE_FILE, '[]');
  }
}

type NewStructurePayload = {
  payload: {
    path: string;
    dataStructure: StructureObject;
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
      payload.fileName,
      payload.isAutosave
    );
    yield put(saveStructureSuccess(payload.isAutosave, payload.fileName));
  } catch (error) {
    yield put(saveStructureFailed(error));
  }
}
export function* watchsaveStructure() {
  yield takeLatest(SAVE_STRUCTURE, saveStructure);
}

// -------------------- Change Current Working Structure File --------------------
type ChangeStructurePayload = {
  payload: {
    path: string;
    structureFile: string;
  };
  type: string;
};
function* changeStructure({ payload }: ChangeStructurePayload) {
  try {
    const structureResponse = yield call(
      getStructureFile,
      payload.path,
      payload.structureFile
    );

    if (structureResponse.status === true) {
      yield put(changeStructureSuccess(structureResponse.data, payload.structureFile));
      return;
    }

    NotificationManager.notificate({
      type: 'error',
      title: 'Structure',
      message: structureResponse.error,
      timeOut: NOTIFICATION_TIMEOUT,
    });

    yield put(changeStructureFailed(structureResponse.error));
  } catch (error) {
    NotificationManager.notificate({
      type: 'error',
      title: 'Structure',
      message: error.toString(),
      timeOut: NOTIFICATION_TIMEOUT,
    });
    yield put(changeStructureFailed(error.toString()));
  }
}
export function* watchchangeStructure() {
  yield takeLatest(CHANGE_STRUCTURE, changeStructure);
}

export default function* rootSaga() {
  yield all([
    fork(watchinitStructure),
    fork(watchsaveStructure),
    fork(watchchangeStructure),
  ]);
}
