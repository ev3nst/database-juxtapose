import * as fs from 'fs';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_SETTINGS } from '../redux.types';
import { CONFIG_PATH, defaultConfig } from '../../utils/constants';
import { initSettingsSuccess, initSettingsFailed } from '../actions';
import { UserConfig } from '../../types/settings.types';

// -------------------- Configure User Settings --------------------
async function configureUserConfig(): Promise<UserConfig> {
  const FileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
  try {
    const data = JSON.parse(FileContents);
    return data as UserConfig;
  } catch (error) {
    console.log(error, 'ERR FROM USER CONFIG');
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultConfig));
    return defaultConfig;
  }
}

function* initSettings() {
  try {
    const response = yield call(configureUserConfig);
    yield put(initSettingsSuccess(response));
  } catch (error) {
    yield put(initSettingsFailed(error));
  }
}
export function* watchinitSettings() {
  yield takeEvery(INITIALIZE_SETTINGS, initSettings);
}

export default function* rootSaga() {
  yield all([fork(watchinitSettings)]);
}
