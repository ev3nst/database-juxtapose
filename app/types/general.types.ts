export type Loading = {
  loading: boolean;
  loaded: boolean;
};

export type Error = {
  errorState: boolean;
  errorMessage: string;
};

export type Initializes = {
  initError: Error;
  initLoading: Loading;
};

export type InteractiveResponder = Loading & Error & Initializes;
