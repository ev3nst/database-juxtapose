import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { LOG_MESSAGE } from '../redux.types';
import { getLogMessageSuccess } from './actions';

// ------------------ TEST LOG MESSAGE --------------------
const getLogMessageAsync = () => {
  return 'Test Log Message..';
  /*
  const dataHttpConf = {
    method: 'GET',
    url: `index.php`,
  };
  return IntAxios(dataHttpConf)
    .then((response) => response)
    .catch((error) => error);
  */
};
function* getLogMessage() {
  try {
    const resp = yield call(getLogMessageAsync);
    yield put(getLogMessageSuccess(resp));
  } catch (error) {}
}
export function* watchgetLogMessage() {
  yield takeEvery(LOG_MESSAGE, getLogMessage);
}

export default function* rootSaga() {
  yield all([fork(watchgetLogMessage)]);
}
