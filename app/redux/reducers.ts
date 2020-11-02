import { combineReducers } from 'redux';
import intro from './intro/reducer';
import settings from './settings/reducer';
import structure from './structure/reducer';

const reducers = combineReducers({
  intro,
  settings,
  structure,
});

export default reducers;
