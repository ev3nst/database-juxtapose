import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { NotificationManager } from '../../components';
import {
  INITIALIZE_STRUCTURE,
  CHANGE_STRUCTURE,
  SAVE_STRUCTURE,
  DELETE_STRUCTURE,
} from '../redux.types';
import { StructureObject } from '../../types';
import {
  EMPTY_STRUCTURE,
  STRUCTURE_AUTOSAVE_NAME,
  STRUCTURE_AUTOSAVE_FILE,
  PAGINATION_LIMIT,
  NOTIFICATION_TIMEOUT,
} from '../../utils/constants';
import {
  getFolderWithPagination,
  getJsonFile,
  saveJsonFile,
  deleteJsonFile,
} from '../../utils/functions';
import {
  initStructureSuccess,
  initStructureFailed,
  saveStructureSuccess,
  saveStructureFailed,
  changeStructureSuccess,
  changeStructureFailed,
  deleteStructureSuccess,
  deleteStructureFailed,
} from '../actions';

// -------------------- Configure Structure Folder & Files --------------------
function* initStructure({
  payload,
}: {
  payload: {
    path: string;
  };
  type: string;
}) {
  try {
    const structureList = yield call(
      getFolderWithPagination,
      payload.path,
      0,
      PAGINATION_LIMIT
    );

    let autosaveFile = yield call(getJsonFile, payload.path, STRUCTURE_AUTOSAVE_FILE);

    if (autosaveFile.status === false) {
      autosaveFile = yield call(
        saveJsonFile,
        payload.path,
        STRUCTURE_AUTOSAVE_NAME,
        EMPTY_STRUCTURE
      );
    }

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
function* saveStructure({
  payload,
}: {
  payload: {
    path: string;
    dataStructure: StructureObject;
    fileName: string;
    isAutosave: boolean;
  };
  type: string;
}) {
  try {
    yield call(saveJsonFile, payload.path, payload.fileName, payload.dataStructure);

    // if new, reset autosave file
    if (payload.isAutosave === false) {
      yield call(saveJsonFile, payload.path, STRUCTURE_AUTOSAVE_NAME, EMPTY_STRUCTURE);
    }

    yield put(saveStructureSuccess(payload.fileName, payload.isAutosave));
  } catch (error) {
    yield put(saveStructureFailed(error));
  }
}
export function* watchsaveStructure() {
  yield takeLatest(SAVE_STRUCTURE, saveStructure);
}

// -------------------- Change Current Working Structure File --------------------
function* changeStructure({
  payload,
}: {
  payload: {
    path: string;
    structureFile: string;
  };
  type: string;
}) {
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

// -------------------- Change Current Working Structure File --------------------
function* deleteStructure({
  payload,
}: {
  payload: {
    path: string;
    structureFile: string;
  };
  type: string;
}) {
  try {
    yield call(deleteJsonFile, payload.path, payload.structureFile);
    yield put(deleteStructureSuccess(payload.structureFile));
    NotificationManager.notificate({
      type: 'success',
      title: 'Structure',
      message: 'Structure file is deleted.',
      timeOut: NOTIFICATION_TIMEOUT,
    });
  } catch (error) {
    NotificationManager.notificate({
      type: 'error',
      title: 'Structure',
      message: error.toString(),
      timeOut: NOTIFICATION_TIMEOUT,
    });
    yield put(deleteStructureFailed(error.toString()));
  }
}
export function* watchdeleteStructure() {
  yield takeLatest(DELETE_STRUCTURE, deleteStructure);
}

export default function* rootSaga() {
  yield all([
    fork(watchinitStructure),
    fork(watchsaveStructure),
    fork(watchchangeStructure),
    fork(watchdeleteStructure),
  ]);
}
