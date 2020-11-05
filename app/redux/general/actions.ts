/* eslint-disable import/prefer-default-export */
import { VALUE_CHANGE } from '../redux.types';

export const valueUpdate = (reducer: string, key: string, value: any) => {
  return {
    type: `${VALUE_CHANGE}${reducer}`,
    payload: {
      key,
      value,
    },
  };
};
