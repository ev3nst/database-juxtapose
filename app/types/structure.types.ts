export type StructureObjectAction = 'add' | 'remove';

export type StructureArrayItem = {
  name: string;
  items: Array<string>;
};

export type StructureObject = Array<StructureArrayItem>;
