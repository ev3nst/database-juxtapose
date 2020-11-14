import { PageLoading, PageError } from '../../types';

export type IntroErrors = {
  errors: {
    settings: PageError;
    structure: PageError;
    migration: PageError;
  };
};

export type IntroLoading = {
  initStates: {
    settings: PageLoading;
    structure: PageLoading;
    migration: PageLoading;
  };
};

export type IntroProgressProps = {
  inverted?: boolean;
} & IntroErrors &
  IntroLoading;
