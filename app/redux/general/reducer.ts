import { LOG_MESSAGE, LOG_MESSAGE_SUCCESS } from '../redux.types';

export type GeneralState = {
  logMessage: string;
};

const INIT_STATE: GeneralState = {
  logMessage: '',
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LOG_MESSAGE:
      return { ...state, logMessage: action.payload.message };
    case LOG_MESSAGE_SUCCESS:
      return { ...state, logMessage: action.payload.message };
    default:
      return { ...state };
  }
};
