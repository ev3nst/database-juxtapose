export type StructureObjectAction = 'add' | 'remove';

export type StructureFieldDataTypes =
  | 'string'
  | 'integer'
  | 'double'
  | 'boolean'
  | 'date'
  | 'timestamp'
  | 'json'
  | 'enum'
  | 'array';

export type StructureFieldType = {
  name: string;
  dataType: StructureFieldDataTypes;
  nullable: boolean;
  default: any;
};

export type StructureArrayItem = {
  name: string;
  items: Array<StructureFieldType>;
};

export type StructureObject = Array<StructureArrayItem>;
