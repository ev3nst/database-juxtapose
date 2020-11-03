import { combineReducers } from 'redux';
import intro from './intro/reducer';
import settings from './settings/reducer';
import structure from './structure/reducer';
import migration from './migration/reducer';

const reducers = combineReducers({
  intro,
  settings,
  structure,
  migration,
});

export default reducers;
