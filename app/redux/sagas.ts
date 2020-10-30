import { all } from 'redux-saga/effects';
import generalSagas from './general/saga';
import settingsSagas from './settings/saga';

export default function* rootSaga(/* getState */) {
  yield all([generalSagas(), settingsSagas()]);
}
