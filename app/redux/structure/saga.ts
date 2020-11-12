import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { NotificationManager } from '../../components/Notification';
import { INITIALIZE_STRUCTURE, CHANGE_STRUCTURE, SAVE_STRUCTURE } from '../redux.types';
import { StructureObject } from '../../types';
import {
  STRUCTURE_AUTOSAVE_NAME,
  STRUCTURE_AUTOSAVE_FILE,
  PAGINATION_LIMIT,
  NOTIFICATION_TIMEOUT,
} from '../../utils/constants';
import {
  getFolderWithPagination,
  getJsonFile,
  saveJsonFile,
} from '../../utils/functions';
import {
  initStructureSuccess,
  initStructureFailed,
  saveStructureSuccess,
  saveStructureFailed,
  changeStructureSuccess,
  changeStructureFailed,
} from '../actions';

// -------------------- Configure Structure Folder & Files --------------------
type StructurePayload = {
  payload: {
    path: string;
  };
  type: string;
};
function* initStructure({ payload }: StructurePayload) {
  try {
    const structureList = yield call(
      getFolderWithPagination,
      payload.path,
      0,
      PAGINATION_LIMIT
    );

    const autosaveFile = yield call(getJsonFile, payload.path, STRUCTURE_AUTOSAVE_FILE);

    if (autosaveFile.status === true && structureList.status === true) {
      const autosaveIndex = structureList.files.indexOf(STRUCTURE_AUTOSAVE_NAME);
      if (autosaveIndex > -1) {
        structureList.files.splice(autosaveIndex, 1);
      }

      yield put(initStructureSuccess(autosaveFile.data, structureList.files));
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
    yield call(saveJsonFile, payload.path, payload.dataStructure, payload.fileName);

    // if new, reset autosave file
    if (payload.isAutosave === false) {
      yield call(saveJsonFile, payload.path, [], STRUCTURE_AUTOSAVE_NAME);
    }

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
      getJsonFile,
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
