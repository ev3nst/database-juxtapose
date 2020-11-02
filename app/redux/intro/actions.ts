import { ActionCreator } from 'redux';
import {
  INITIALIZE_APP,
  INITIALIZE_APP_SUCCESS,
} from '../redux.types';
import { IntroActionTypes } from './action.types';

export const initApp: ActionCreator<IntroActionTypes> = () => ({
  type: INITIALIZE_APP,
  payload: null,
});

export const initAppSuccess: ActionCreator<IntroActionTypes> = () => ({
  type: INITIALIZE_APP_SUCCESS,
  payload: null,
});
