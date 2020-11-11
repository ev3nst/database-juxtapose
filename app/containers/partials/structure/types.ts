export type PreviewProps = {
  dataStructure: { [key: string]: Array<string> };
  onRemoveHeader: (removeHeader: string) => void;
  onRemoveField: (removeField: string, whichHeader: string) => void;
  inverted?: boolean;
};
export type FieldFormProps = {
  structureHeaders: Array<string>;
  onNewField: (newField: string, selectedHeader: string) => void;
};
export type FieldFormStates = {
  selectedHeader?: string;
  newField: string;
};

export type HeaderFormProps = {
  onNewHeader: (newHeader: string) => void;
};
export type HeaderFormStates = {
  newHeader: string;
};

export type SaveModalProps = {
  onConfirm: (fileName: string) => void;
  pathPrefix: string;
  inverted?: boolean;
};
export type SaveModalStates = {
  fileName: string;
  showModal: boolean;
  errorState: boolean;
  errorMessage: string;
};
