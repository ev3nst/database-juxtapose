import * as fs from 'fs';
import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_SETTINGS, SAVE_SETTINGS } from '../redux.types';
import { CONFIG_PATH, USER_FOLDER, defaultConfig } from '../../utils/constants';
import {
  initSettingsSuccess,
  initSettingsFailed,
  saveSettingsSuccess,
  saveSettingsFailed,
} from '../actions';
import { UserConfig, SettingPathInterface } from '../../types';
import { NotificationManager } from '../../components/Notification';

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
  yield takeLatest(INITIALIZE_SETTINGS, initSettings);
}

type SaveSettingsPayload = {
  settings: UserConfig;
  newPaths: SettingPathInterface;
};
async function saveSettingsAsync({ settings, newPaths }: SaveSettingsPayload) {
  const keys = Object.keys(settings.paths);
  for (let i = 0; i < keys.length; i += 1) {
    const pathKey = keys[i] as keyof typeof settings.paths;
    if (
      keys[i] !== 'userSettings' &&
      newPaths[pathKey] !== '' &&
      settings.paths[pathKey] !== newPaths[pathKey]
    ) {
    }
  }

  /*
  fs.readdirSync(settings.paths[pathKey]).forEach((file) => {
    if (file.includes('_autosave.json') === false) {
      fs.renameSync(settings.paths[pathKey] + file, newPaths[pathKey] + file);
    }
  });
*/
}

function* saveSettings({ payload }: { payload: SaveSettingsPayload; type: string }) {
  try {
    const response = yield call(saveSettingsAsync, payload);
    // yield put(saveSettingsSuccess(response));

    NotificationManager.notificate({
      type: 'error',
      title: 'Error',
      message: 'this is error message',
      timeOut: 2500,
    });

    yield put(saveSettingsFailed('this is error message'));
  } catch (error) {
    yield put(saveSettingsFailed(error));
  }
}
export function* watchsaveSettings() {
  yield takeEvery(SAVE_SETTINGS, saveSettings);
}

export default function* rootSaga() {
  yield all([fork(watchinitSettings), fork(watchsaveSettings)]);
}
