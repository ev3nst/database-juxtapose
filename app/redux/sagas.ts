import { all } from 'redux-saga/effects';
import generalSagas from './general/saga';

export default function* rootSaga(/* getState */) {
  yield all([
    generalSagas(),
  ]);
}
