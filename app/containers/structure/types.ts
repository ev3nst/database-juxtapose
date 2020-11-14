import { StructureObject } from '../../types';

export type PreviewProps = {
  dataStructure: StructureObject;
  onSort: (oldIndex: number, newIndex: number) => void;
  onRemoveHeader: (removeHeader: string) => void;
  onRemoveField: (removeField: string, whichHeader: string) => void;
  inverted: boolean;
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
