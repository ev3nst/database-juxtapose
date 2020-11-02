import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_STRUCTURE } from '../redux.types';
import { USER_FOLDER, defaultConfig } from '../../utils/constants';
import { initStructureSuccess } from './actions';
import * as fs from 'fs';

// ------------------ Configure User Structure --------------------

function* initStructure() {}
export function* watchinitStructure() {
  yield takeEvery(INITIALIZE_STRUCTURE, initStructure);
}

export default function* rootSaga() {
  yield all([fork(watchinitStructure)]);
}
