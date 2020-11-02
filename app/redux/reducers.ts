import { combineReducers } from 'redux';
import general from './general/reducer';
import settings from './settings/reducer';
import structure from './structure/reducer';

const reducers = combineReducers({
  general,
  settings,
  structure,
});

export default reducers;
