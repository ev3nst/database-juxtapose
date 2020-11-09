import fs from 'fs';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  CANCEL_SETTINGS,
  CHANGE_PATH,
  INITIALIZE_SETTINGS,
  SAVE_SETTINGS,
} from '../redux.types';
import {
  CONFIG_PATH,
  USER_FOLDER,
  NOTIFICATION_TIMEOUT,
  defaultConfig,
} from '../../utils/constants';
import {
  initSettingsSuccess,
  initSettingsFailed,
  saveSettingsSuccess,
  saveSettingsFailed,
  cancelSettingsSuccess,
  changePathSuccess,
} from '../actions';
import { UserConfig, SettingPathInterface } from '../../types';
import { NotificationManager } from '../../components/Notification';
import {
  zipDirectory,
  moveToNewPaths,
  checkIfDirectoryEmpty,
} from '../../utils/functions';

async function getUserSettings(): Promise<UserConfig> {
  const FileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
  return JSON.parse(FileContents) as UserConfig;
}

// -------------------- Cancel Settings --------------------
function* cancelSettings() {
  try {
    const response = yield call(getUserSettings);
    yield put(cancelSettingsSuccess(response));
  } catch (error) {
    NotificationManager.notificate({
      type: 'error',
      title: 'Settings',
      message: 'There was an error while trying to read user settings files.',
      timeOut: NOTIFICATION_TIMEOUT,
    });
  }
}
export function* watchcancelSettings() {
  yield takeEvery(CANCEL_SETTINGS, cancelSettings);
}

// -------------------- Reset Settings --------------------
async function resetSettings(): Promise<UserConfig> {
  if (!fs.existsSync(USER_FOLDER)) {
    fs.mkdirSync(USER_FOLDER);
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultConfig));
  return defaultConfig;
}

// -------------------- Initialize Settings --------------------
async function configureUserConfig(forceReset: boolean = false): Promise<UserConfig> {
  try {
    if (forceReset === true) {
      return resetSettings();
    }
    return getUserSettings();
  } catch (error) {
    return resetSettings();
  }
}

function* initSettings({ payload }: { payload: { forceReset?: boolean }; type: string }) {
  try {
    const response = yield call(configureUserConfig, payload.forceReset);

    const settPathKeys = Object.keys(response.paths);
    for (let i = 0; i < settPathKeys.length; i += 1) {
      const pathKey = settPathKeys[i] as keyof typeof response.paths;
      if (
        response.paths[pathKey] === undefined ||
        response.paths[pathKey] === null ||
        response.paths[pathKey] === ''
      ) {
        yield put(initSettingsFailed('User settings file has corrupted values'));
      }
    }

    yield put(initSettingsSuccess(response));
  } catch (error) {
    yield put(initSettingsFailed(error.toString()));
  }
}
export function* watchinitSettings() {
  yield takeEvery(INITIALIZE_SETTINGS, initSettings);
}

// -------------------- Save Settings --------------------
function* saveSettings({
  payload,
}: {
  payload: { settings: UserConfig; newPaths: SettingPathInterface };
  type: string;
}) {
  const { settings, newPaths } = payload;
  try {
    const foldersToMove = [];
    const keys = Object.keys(settings.paths);
    for (let i = 0; i < keys.length; i += 1) {
      const pathKey = keys[i] as keyof typeof settings.paths;

      if (
        keys[i] !== 'userSettings' &&
        newPaths[pathKey] !== '' &&
        settings.paths[pathKey] !== newPaths[pathKey]
      ) {
        const zipPath = `${USER_FOLDER + String(pathKey)}_backup.zip`;
        const resp = yield call(zipDirectory, zipPath, settings.paths[pathKey]);
        if (resp !== true) {
          NotificationManager.notificate({
            type: 'error',
            title: 'Error',
            message: 'Error while creating backup zip. Path settings could not be saved.',
            timeOut: NOTIFICATION_TIMEOUT,
          });
          yield put(saveSettingsFailed('Error while creating backup zip.'));
          return;
        }

        foldersToMove.push({
          oldPath: settings.paths[pathKey],
          newPath: newPaths[pathKey],
        });
        settings.paths[pathKey] = newPaths[pathKey];
      }
    }

    if (foldersToMove.length > 0) {
      const isNewPathsValid = yield call(moveToNewPaths, foldersToMove);
      if (isNewPathsValid !== true) {
        NotificationManager.notificate({
          type: 'error',
          title: 'Error',
          message: `Error while moving files to new location(s). Backup zip created at: ${USER_FOLDER}`,
          timeOut: NOTIFICATION_TIMEOUT,
        });
        yield put(saveSettingsFailed('Error while moving files to new location(s).'));
        return;
      }
    }

    yield call(fs.writeFileSync, CONFIG_PATH, JSON.stringify(settings));

    NotificationManager.notificate({
      type: 'success',
      title: 'Save',
      message: 'Settings are saved successfuly.',
      timeOut: NOTIFICATION_TIMEOUT,
    });

    yield put(saveSettingsSuccess(settings));
  } catch (error) {
    NotificationManager.notificate({
      type: 'error',
      title: 'Unexpected Error',
      message: JSON.stringify(error.toString()),
      timeOut: NOTIFICATION_TIMEOUT,
    });
    yield put(saveSettingsFailed('Unexpected Error'));
  }
}
export function* watchsaveSettings() {
  yield takeEvery(SAVE_SETTINGS, saveSettings);
}

// -------------------- Change Path --------------------
function* changePath({
  payload,
}: {
  payload: { pathKey: string; newPath: string };
  type: string;
}) {
  try {
    const isEmpty = yield call(checkIfDirectoryEmpty, payload.newPath);
    if (isEmpty === true) {
      yield put(changePathSuccess(payload.pathKey, payload.newPath));
    } else {
      NotificationManager.notificate({
        type: 'error',
        title: 'Error',
        message: 'Selected folder is not empty.',
        timeOut: NOTIFICATION_TIMEOUT,
      });
    }
  } catch (error) {
    NotificationManager.notificate({
      type: 'error',
      title: 'Error',
      message: 'Unexpected error. Selected folder could not be checked.',
      timeOut: NOTIFICATION_TIMEOUT,
    });
  }
}

export function* watchchangePath() {
  yield takeEvery(CHANGE_PATH, changePath);
}

export default function* rootSaga() {
  yield all([
    fork(watchinitSettings),
    fork(watchsaveSettings),
    fork(watchcancelSettings),
    fork(watchchangePath),
  ]);
}
