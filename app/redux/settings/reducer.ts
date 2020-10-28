import { THEME } from '../types';

const INIT_STATE = {
  isDrawerOpen: false,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case THEME:
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    default:
      return { ...state };
  }
};
