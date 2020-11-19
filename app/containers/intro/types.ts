import { PageLoading, PageError } from '../../types';

export type IntroErrors = {
  errors: {
    settings: PageError;
    structure: PageError;
    integration: PageError;
  };
};

export type IntroLoading = {
  initStates: {
    settings: PageLoading;
    structure: PageLoading;
    integration: PageLoading;
  };
};

export type IntroProgressProps = {
  inverted?: boolean;
} & IntroErrors &
  IntroLoading;
