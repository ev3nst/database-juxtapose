import { all } from 'redux-saga/effects';
import settingsSagas from './settings/saga';
import structureSagas from './structure/saga';
import migrationSagas from './migration/saga';

export default function* rootSaga(/* getState */) {
  yield all([settingsSagas(), structureSagas(), migrationSagas()]);
}
