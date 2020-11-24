import { ActionCreator } from 'redux';
import { StructureObject } from '../../types';
import { StructureActionTypes } from '../../redux/structure/action.types';

export type PaneItem = {
  menuItem?: any;
  render?: (() => React.ReactNode) | undefined;
};

export type StructureDataTypesProps = {
  dataStructure: StructureObject;
  manipulateFieldData: ActionCreator<StructureActionTypes>;
};

export type StructureListProps = {
  structureFile: string;
  structuresPath: string;
  allStructures: Array<string>;
  changeStructure: ActionCreator<StructureActionTypes>;
  deleteStructure: ActionCreator<StructureActionTypes>;
  onNavigate: () => void;
};

export type StructureListStates = {
  deleteStructureConfirm: boolean;
  whichStructure: string;
};
