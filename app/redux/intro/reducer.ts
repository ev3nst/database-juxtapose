import {
    INITIALIZE_APP,
    INITIALIZE_APP_SUCCESS,
  } from '../redux.types';
  import { IntroActionTypes } from './action.types';
  
  export interface InitAppState {
      loaded: boolean;
  }
  
  const INIT_STATE: InitAppState = {
    loaded: false,
  };
  
  const reducer = (
    state: InitAppState = INIT_STATE,
    action: IntroActionTypes
  ): InitAppState => {
    switch (action.type) {
      case INITIALIZE_APP:
        return {
          ...state,
          loaded: false,
        };
      case INITIALIZE_APP_SUCCESS:
        return {
          ...state,
          loaded: true,
        };
      default:
        return { ...state };
    }
  };
  
  export default reducer;
  