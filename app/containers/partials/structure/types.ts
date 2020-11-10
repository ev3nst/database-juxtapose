export type PreviewProps = {
  newStructure: { [key: string]: Array<string> };
  onRemoveHeader: (removeHeader: string) => void;
  onRemoveField: (removeField: string, whichHeader: string) => void;
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