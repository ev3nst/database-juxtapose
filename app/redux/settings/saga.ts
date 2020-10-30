import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_SETTINGS } from '../redux.types';
import {
  USER_FOLDER,
  SETTINGS_PATH,
  defaultConfig,
} from '../../utils/constants';
import { initializeSettingsSuccess } from './actions';
import * as fs from 'fs';

// ------------------ Configure User Settings --------------------
async function configureUserSettings() {
  if (fs.existsSync(SETTINGS_PATH)) {
    let data = fs.readFileSync(SETTINGS_PATH, 'utf8');
    data = JSON.parse(data);
    return data;
  } else {
    if (!fs.existsSync(USER_FOLDER)) {
      fs.mkdirSync(USER_FOLDER);
    }
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(defaultConfig));
    return defaultConfig;
  }
}
function* initializeSettings() {
  try {
    const resp = yield call(configureUserSettings);
    console.log(resp, 'RESPONSE FROM CONFG');
    if (resp !== undefined && resp !== false && resp !== null) {
      yield put(initializeSettingsSuccess(resp));
    }
  } catch (error) {
    console.log(error, 'ERROR FROM INIT SET');
  }
}
export function* watchinitializeSettings() {
  yield takeEvery(INITIALIZE_SETTINGS, initializeSettings);
}

export default function* rootSaga() {
  yield all([fork(watchinitializeSettings)]);
}
