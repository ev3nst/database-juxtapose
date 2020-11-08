import * as fs from 'fs';
import archiver from 'archiver';
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

function zipDirectory(zipPath: string, folderToZip: string) {
  const stream = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    archive
      .directory(folderToZip, false)
      .on('error', (err) => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve(true));
    archive.finalize();
  });
}

function moveToNewPaths({ settings, newPaths }: SaveSettingsPayload) {
  const keys = Object.keys(settings.paths);
  return new Promise((resolve, reject) => {
    try {
      for (let i = 0; i < keys.length; i += 1) {
        const pathKey = keys[i] as keyof typeof settings.paths;
        if (
          keys[i] !== 'userSettings' &&
          newPaths[pathKey] !== '' &&
          settings.paths[pathKey] !== newPaths[pathKey]
        ) {
          fs.readdirSync(settings.paths[pathKey]).forEach((file) => {
            if (file.includes('_autosave.json') === false) {
              fs.renameSync(settings.paths[pathKey] + file, newPaths[pathKey] + file);
            }
          });
        }
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

type SaveSettingsPayload = {
  settings: UserConfig;
  newPaths: SettingPathInterface;
};

function* saveSettings({ payload }: { payload: SaveSettingsPayload; type: string }) {
  const { settings, newPaths } = payload;

  const backups = [];
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
        console.log(resp, 'Error while creating backup zip.');
        yield put(saveSettingsFailed('Error while creating backup zip.'));
        return;
      }
      backups.push(zipPath);
    }
  }

  const isNewPathsValid = yield call(moveToNewPaths, payload);
  if (isNewPathsValid !== true) {
    console.log(
      isNewPathsValid,
      `Error while moving files to new location(s). Zip Files: ${JSON.stringify(backups)}`
    );
    yield put(saveSettingsFailed('Error while moving files to new location(s).'));
    return;
  }

  yield put(saveSettingsSuccess());
}
export function* watchsaveSettings() {
  yield takeEvery(SAVE_SETTINGS, saveSettings);
}

export default function* rootSaga() {
  yield all([fork(watchinitSettings), fork(watchsaveSettings)]);
}
