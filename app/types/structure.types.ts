export type StructureObjectAction = 'add' | 'remove';

export type StructureFieldDataTypes =
  | 'String'
  | 'Integer'
  | 'Double'
  | 'Boolean'
  | 'Date'
  | 'Timestamp'
  | 'Json'
  | 'Enum'
  | 'Array'
  | 'Any';

export type StructureFieldKeys = 'fieldName' | 'dataType' | 'required' | 'defaultValue';

export type StructureFieldType = {
  fieldName: string;
  dataType: StructureFieldDataTypes;
  required: boolean;
  defaultValue: any;
};

export type StructureObject = {
  name: string;
  description: string;
  structure: {
    itemName: string;
    items: Array<StructureFieldType>;
  }[];
};
