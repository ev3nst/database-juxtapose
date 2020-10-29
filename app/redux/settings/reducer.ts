import { THEME } from '../types';

const INIT_STATE = {
  settingsPath: null,
  migrationsPath: null,
  structuresPath: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case SETTINGS_PATH:
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    default:
      return { ...state };
  }
};
