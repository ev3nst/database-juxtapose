import { ActionCreator } from 'redux';
import { StructureObject, StructureFieldType } from '../../types';
import { StructureActionTypes } from '../../redux/structure/action.types';

export type PreviewProps = {
  dataStructure: StructureObject;
  onSort: (oldIndex: number, newIndex: number) => void;
  onRemoveHeader: (removeHeader: string) => void;
  onRemoveField: (removeField: string, whichHeader: string) => void;
  inverted: boolean;
};

// #region Data Types Component
export type PaneItem = {
  menuItem?: any;
  render?: (() => React.ReactNode) | undefined;
};

export type FieldDataProps = {
  header: string;
  field: StructureFieldType;
  manipulateFieldData: ActionCreator<StructureActionTypes>;
};

export type StructureDataTypesProps = {
  dataStructure: StructureObject;
  manipulateFieldData: ActionCreator<StructureActionTypes>;
};
// #endregion

// #region Field Inputs
export type FieldInputProps = {
  structureHeaders: Array<string>;
  onNewField: (newField: string, selectedHeader: string) => void;
};

export type FieldInputStates = {
  selectedHeader?: string;
  newField: string;
};

export type HeaderInputProps = {
  onNewHeader: (newHeader: string) => void;
};

export type HeaderInputStates = {
  newHeader: string;
};

export type DescriptionInputProps = {
  description: string;
  onDescriptionChange: (description: string) => void;
};

export type DescriptionInputStates = {
  description: string;
};

// #endregion

// #region Sortable
export type SortableFieldType = {
  field: string;
  header: string;
  onRemoveField: (removeField: string, whichHeader: string) => void;
  inverted?: boolean;
};

export type SortableFieldContainerType = {
  children: JSX.Element[];
  inverted: boolean;
};

export type SortableHeaderContainerType = {
  children: JSX.Element[];
  inverted: boolean;
};

export type SortableHeaderType = {
  header: string;
  inverted: boolean;
  items: Array<StructureFieldType>;
  onRemoveHeader: (removeHeader: string) => void;
  onRemoveField: (removeField: string, whichHeader: string) => void;
  onSort: (oldIndex: number, newIndex: number, whichHeader: string) => void;
};
// #endregion

export type StructureItemProps = {
  dataStructure: StructureObject;
  sortStructure: ActionCreator<StructureActionTypes>;
  MetaChange: ActionCreator<StructureActionTypes>;
  AddOrRemoveHeader: ActionCreator<StructureActionTypes>;
  AddOrRemoveField: ActionCreator<StructureActionTypes>;
};
