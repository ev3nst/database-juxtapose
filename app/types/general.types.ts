export type PageLoading = {
  loading: boolean;
  loaded: boolean;
};

export type PageError = {
  errorState: boolean;
  errorMessage: string;
};

export type Initializes = {
  initError: PageError;
  initLoading: PageLoading;
};

export type InteractiveResponder = PageLoading & PageError & Initializes;
