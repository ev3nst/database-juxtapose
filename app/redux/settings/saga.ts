import * as fs from 'fs';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_SETTINGS } from '../redux.types';
import { CONFIG_PATH, USER_FOLDER, defaultConfig } from '../../utils/constants';
import { initSettingsSuccess, initSettingsFailed } from '../actions';
import { UserConfig } from '../../types/settings.types';

// -------------------- Configure User Settings --------------------
async function configureUserConfig(): Promise<UserConfig> {
  try {
    const FileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
    const data = JSON.parse(FileContents);
    return data as UserConfig;
  } catch (error) {
    if (!fs.existsSync(USER_FOLDER)) {
      fs.mkdirSync(USER_FOLDER);
    }

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
