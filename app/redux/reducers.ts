import { combineReducers } from 'redux';
import intro from './intro/reducer';
import settings from './settings/reducer';
import structure from './structure/reducer';
import integration from './integration/reducer';

const reducers = combineReducers({
  intro,
  settings,
  structure,
  integration,
});

export default reducers;
