import {
  VALUE_CHANGE,
  LOG_MESSAGE,
  LOG_MESSAGE_SUCCESS
} from '../types';

export const valueUpdate = (reducer: string, key: string, value: any) => {
  return {
    type: `${VALUE_CHANGE}${reducer}`,
    payload: {
      key,
      value,
    },
  };
};

export const getLogMessage = () => ({
  type: LOG_MESSAGE,
  payload: {},
});

export const getLogMessageSuccess = (message: string) => {
  return {
    type: LOG_MESSAGE_SUCCESS,
    payload: { message },
  };
};
