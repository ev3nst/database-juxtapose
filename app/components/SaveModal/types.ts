export type SaveModalProps = {
  onConfirm: (fileName: string) => void;
  pathPrefix: string;
  label: string;
  inverted?: boolean;
};
export type SaveModalStates = {
  fileName: string;
  showModal: boolean;
  errorState: boolean;
  errorMessage: string;
};
