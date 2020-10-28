import { combineReducers } from 'redux';
import general from './general/reducer';
import settings from './settings/reducer';

const reducers = combineReducers({
  general,
  settings,
});

export default reducers;
