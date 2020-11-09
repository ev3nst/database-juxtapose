import fs from 'fs';
import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { CHANGE_PATH, INITIALIZE_SETTINGS, SAVE_SETTINGS } from '../redux.types';
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
  changePathSuccess,
} from '../actions';
import { UserConfig, SettingPathInterface } from '../../types';
import { NotificationManager } from '../../components/Notification';
import {
  zipDirectory,
  moveToNewPaths,
  checkIfDirectoryEmpty,
} from '../../utils/functions';

// -------------------- Configure User Settings --------------------
async function resetSettings(): Promise<UserConfig> {
  if (!fs.existsSync(USER_FOLDER)) {
    fs.mkdirSync(USER_FOLDER);
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultConfig));
  return defaultConfig;
}

async function configureUserConfig(forceReset: boolean = false): Promise<UserConfig> {
  try {
    if (forceReset === true) {
      return resetSettings();
    }
    const FileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
    const data = JSON.parse(FileContents) as UserConfig;
    return data as UserConfig;
  } catch (error) {
    return resetSettings();
  }
}

type InitSettingsPayload = {
  forceReset?: boolean;
};

function* initSettings({ payload }: { payload: InitSettingsPayload; type: string }) {
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
  yield takeLatest(INITIALIZE_SETTINGS, initSettings);
}

type ChangePathPayload = {
  pathKey: string;
  newPath: string;
};
function* changePath({ payload }: { payload: ChangePathPayload; type: string }) {
  try {
    const isEmpty = yield call(checkIfDirectoryEmpty, payload.newPath);
    if (isEmpty === true) {
      yield put(changePathSuccess(payload));
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

type SaveSettingsPayload = {
  settings: UserConfig;
  newPaths: SettingPathInterface;
};

function* saveSettings({ payload }: { payload: SaveSettingsPayload; type: string }) {
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

    yield put(saveSettingsSuccess());
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

export default function* rootSaga() {
  yield all([fork(watchinitSettings), fork(watchsaveSettings), fork(watchchangePath)]);
}
