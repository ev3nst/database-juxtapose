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

export type StructureFieldType = {
  name: string;
  dataType: StructureFieldDataTypes;
  required: boolean;
  defaultValue: any;
};

export type StructureArrayItem = {
  name: string;
  items: Array<StructureFieldType>;
};

export type StructureObject = Array<StructureArrayItem>;
