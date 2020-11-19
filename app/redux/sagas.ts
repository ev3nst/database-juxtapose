import { all } from 'redux-saga/effects';
import settingsSagas from './settings/saga';
import structureSagas from './structure/saga';
import integrationSagas from './integration/saga';

export default function* rootSaga() {
  yield all([settingsSagas(), structureSagas(), integrationSagas()]);
}
