import {
  INITIALIZE_APP,
  INITIALIZE_APP_SUCCESS,
} from '../redux.types';

export interface InitApp {
  type: typeof INITIALIZE_APP;
  payload: null;
}

export interface InitAppSuccess {
  type: typeof INITIALIZE_APP_SUCCESS;
  payload: null;
}

export type IntroActionTypes =
  | InitApp
  | InitAppSuccess
