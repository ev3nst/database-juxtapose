import { ActionCreator } from 'redux';
import { SettingPathInterface, StructureObject, StructureFieldType } from '../../types';
import { StructureActionTypes } from '../../redux/structure/action.types';

export type PreviewProps = {
  dataStructure: StructureObject;
  onSort: (oldIndex: number, newIndex: number) => void;
  onRemoveHeader: (removeHeader: string) => void;
  onRemoveField: (removeField: string, whichHeader: string) => void;
  inverted: boolean;
};

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

export type FormSegmentProps = {
  paths: SettingPathInterface;
  activeFile: string;
  dataStructure: StructureObject;
  SaveStructure: ActionCreator<StructureActionTypes>;
};

export type PaneItem = {
  menuItem?: any;
  render?: (() => React.ReactNode) | undefined;
};

export type StructureDataTypesProps = {
  dataStructure: StructureObject;
  manipulateFieldData: ActionCreator<StructureActionTypes>;
};

export type StructureDetailProps = {
  paths: SettingPathInterface;
  activeFile: string;
  autosaveLoading: boolean;
  dataStructure: StructureObject;
  SaveStructure: ActionCreator<StructureActionTypes>;
  SortStructure: ActionCreator<StructureActionTypes>;
  AddOrRemoveHeader: ActionCreator<StructureActionTypes>;
  AddOrRemoveField: ActionCreator<StructureActionTypes>;
  ManipulateFieldData: ActionCreator<StructureActionTypes>;
  errorState: boolean;
  errorMessage: string;
};

export type StructureDetailStates = {
  showDataTypes: boolean;
  showNotification: boolean;
};

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

export type StructureListProps = {
  activeFile: string;
  structuresPath: string;
  allStructures: Array<string>;
  changeStructure: ActionCreator<StructureActionTypes>;
  deleteStructure: ActionCreator<StructureActionTypes>;
};

export type StructureListStates = {
  deleteStructureConfirm: boolean;
  whichStructure: string;
};

export type FieldDataProps = {
  header: string;
  field: StructureFieldType;
  manipulateFieldData: ActionCreator<StructureActionTypes>;
};

export type StructureItemProps = {
  dataStructure: StructureObject;
  sortStructure: ActionCreator<StructureActionTypes>;
  AddOrRemoveHeader: ActionCreator<StructureActionTypes>;
  AddOrRemoveField: ActionCreator<StructureActionTypes>;
};
