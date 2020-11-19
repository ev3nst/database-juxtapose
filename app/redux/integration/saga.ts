import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { NotificationManager } from '../../components';
import {
  INITIALIZE_INTEGRATION,
  CHANGE_INTEGRATION,
  SAVE_INTEGRATION,
} from '../redux.types';
import { IntegrationObject } from '../../types';
import {
  INTEGRATION_AUTOSAVE_FILE,
  INTEGRATION_AUTOSAVE_NAME,
  PAGINATION_LIMIT,
  NOTIFICATION_TIMEOUT,
  EMPTY_INTEGRATION,
} from '../../utils/constants';
import {
  getFolderWithPagination,
  getJsonFile,
  saveJsonFile,
} from '../../utils/functions';
import {
  initIntegrationSuccess,
  initIntegrationFailed,
  saveIntegrationSuccess,
  saveIntegrationFailed,
  changeIntegrationSuccess,
  changeIntegrationFailed,
} from '../actions';

// -------------------- Configure Integration Folder & Files --------------------
type IntegrationPayload = {
  payload: {
    path: string;
  };
  type: string;
};
function* initIntegration({ payload }: IntegrationPayload) {
  try {
    const integrationList = yield call(
      getFolderWithPagination,
      payload.path,
      0,
      PAGINATION_LIMIT
    );

    let autosaveFile = yield call(getJsonFile, payload.path, INTEGRATION_AUTOSAVE_FILE);

    if (autosaveFile.status === false) {
      autosaveFile = yield call(
        saveJsonFile,
        payload.path,
        INTEGRATION_AUTOSAVE_NAME,
        EMPTY_INTEGRATION
      );
    }

    if (autosaveFile.status === true && integrationList.status === true) {
      const autosaveIndex = integrationList.files.indexOf(INTEGRATION_AUTOSAVE_NAME);
      if (autosaveIndex > -1) {
        integrationList.files.splice(autosaveIndex, 1);
      }

      yield put(initIntegrationSuccess(autosaveFile.data, integrationList.files));
      return;
    }

    yield put(
      initIntegrationFailed(`Errors: 1. ${autosaveFile.error} 2.${integrationList.error}`)
    );
  } catch (error) {
    yield put(initIntegrationFailed(error.toString()));
  }
}
export function* watchinitIntegration() {
  yield takeEvery(INITIALIZE_INTEGRATION, initIntegration);
}

// -------------------- Save New Integration File --------------------
type NewIntegrationPayload = {
  payload: {
    path: string;
    dataIntegration: IntegrationObject;
    isAutosave: boolean;
    fileName: string;
  };
  type: string;
};
function* saveIntegration({ payload }: NewIntegrationPayload) {
  try {
    yield call(saveJsonFile, payload.path, payload.fileName, payload.dataIntegration);

    // if new, reset autosave file
    if (payload.isAutosave === false) {
      yield call(
        saveJsonFile,
        payload.path,
        INTEGRATION_AUTOSAVE_NAME,
        EMPTY_INTEGRATION
      );
    }

    yield put(saveIntegrationSuccess(payload.isAutosave, payload.fileName));
  } catch (error) {
    yield put(saveIntegrationFailed(error));
  }
}
export function* watchsaveIntegration() {
  yield takeLatest(SAVE_INTEGRATION, saveIntegration);
}

// -------------------- Change Current Working Integration File --------------------
type ChangeIntegrationPayload = {
  payload: {
    path: string;
    integrationFile: string;
  };
  type: string;
};
function* changeIntegration({ payload }: ChangeIntegrationPayload) {
  try {
    const integrationResponse = yield call(
      getJsonFile,
      payload.path,
      payload.integrationFile
    );

    if (integrationResponse.status === true) {
      yield put(
        changeIntegrationSuccess(integrationResponse.data, payload.integrationFile)
      );
      return;
    }

    NotificationManager.notificate({
      type: 'error',
      title: 'Integration',
      message: integrationResponse.error,
      timeOut: NOTIFICATION_TIMEOUT,
    });

    yield put(changeIntegrationFailed(integrationResponse.error));
  } catch (error) {
    NotificationManager.notificate({
      type: 'error',
      title: 'Integration',
      message: error.toString(),
      timeOut: NOTIFICATION_TIMEOUT,
    });
    yield put(changeIntegrationFailed(error.toString()));
  }
}
export function* watchchangeIntegration() {
  yield takeLatest(CHANGE_INTEGRATION, changeIntegration);
}

export default function* rootSaga() {
  yield all([fork(watchinitIntegration)]);
}
