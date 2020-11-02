import { all } from 'redux-saga/effects';
import settingsSagas from './settings/saga';
import structureSagas from './structure/saga';

export default function* rootSaga(/* getState */) {
  yield all([
    settingsSagas(),
    structureSagas()
  ]);
}
