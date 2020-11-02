import * as fs from 'fs';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_SETTINGS } from '../redux.types';
import {
  USER_FOLDER,
  CONFIG_PATH,
  STRUCTURE_AUTOSAVE_FILE,
  defaultConfig,
} from '../../utils/constants';
import { initSettingsSuccess, initSettingsError } from './actions';
import { UserConfig } from '../../types/settings.types';

// ------------------ Configure User Settings --------------------
async function configureUserConfig(): Promise<UserConfig> {
  if (fs.existsSync(CONFIG_PATH)) {
    const FileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
    try {
      const data = JSON.parse(FileContents);
      return data as UserConfig;
    } catch (error) {
      console.log(error, 'ERR FROM USER CONFIG');
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultConfig));
      return defaultConfig;
    }
  } else {
    if (!fs.existsSync(USER_FOLDER)) {
      fs.mkdirSync(USER_FOLDER);
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultConfig));
    return defaultConfig;
  }
}

async function configureStructureFiles(userConfig: UserConfig) {
  if (!fs.existsSync(userConfig.paths.structures)) {
    fs.mkdirSync(userConfig.paths.structures);
  }

  if (!fs.existsSync(userConfig.paths.structures + STRUCTURE_AUTOSAVE_FILE)) {
    fs.writeFileSync(
      userConfig.paths.structures + STRUCTURE_AUTOSAVE_FILE,
      null
    );
    return null;
  } else {
    const FileContents = fs.readFileSync(
      userConfig.paths.structures + STRUCTURE_AUTOSAVE_FILE,
      'utf8'
    );
    const data = JSON.parse(FileContents);
    return data;
  }
}

function* initSettings() {
  try {
    const userConfigResponse = yield call(configureUserConfig);
    if (
      userConfigResponse !== undefined &&
      userConfigResponse !== false &&
      userConfigResponse !== null
    ) {
      const resp = configureStructureFiles(userConfigResponse);
      console.log(resp, 'RESP FROM STRUCTURE ATUSAVE');
      yield put(initSettingsSuccess(userConfigResponse));
    } else {
      yield put(initSettingsError());
    }
  } catch (error) {
    yield put(initSettingsError(error));
  }
}
export function* watchinitSettings() {
  yield takeEvery(INITIALIZE_SETTINGS, initSettings);
}

export default function* rootSaga() {
  yield all([fork(watchinitSettings)]);
}
