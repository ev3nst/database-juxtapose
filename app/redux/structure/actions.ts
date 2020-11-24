import { ActionCreator } from 'redux';
import {
  SORT_STRUCTURE,
  ADD_OR_REMOVE_S_HEADER,
  ADD_OR_REMOVE_S_FIELD,
  MANIPULATE_FIELD_DATA,
  META_CHANGE,
} from '../redux.types';
import {
  StructureObjectAction,
  StructureFieldDataTypes,
  StructureFieldKeys,
} from '../../types';
import { StructureActionTypes, MetaNames } from './action.types';

export * from './async';

export const addOrRemoveHeader: ActionCreator<StructureActionTypes> = (
  itemName: string,
  action: StructureObjectAction
) => ({
  type: ADD_OR_REMOVE_S_HEADER,
  payload: { itemName, action },
});

export const addOrRemoveField: ActionCreator<StructureActionTypes> = (
  itemName: string,
  fieldName: string,
  action: StructureObjectAction
) => ({
  type: ADD_OR_REMOVE_S_FIELD,
  payload: { itemName, fieldName, action },
});

export const sortStructure: ActionCreator<StructureActionTypes> = (
  oldIndex: number,
  newIndex: number,
  itemName?: string
) => ({
  type: SORT_STRUCTURE,
  payload: { oldIndex, newIndex, itemName },
});

export const manipulateFieldData: ActionCreator<StructureActionTypes> = (
  itemName: string,
  fieldName: string,
  key: StructureFieldKeys,
  value: string | StructureFieldDataTypes | boolean
) => ({
  type: MANIPULATE_FIELD_DATA,
  payload: { itemName, fieldName, key, value },
});

export const metaChange: ActionCreator<StructureActionTypes> = (
  value: string,
  metaName: MetaNames
) => ({
  type: META_CHANGE,
  payload: { value, metaName },
});
