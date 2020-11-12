import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

export type StructureFieldType = {
  value: string;
  key: string;
  onRemoveField: (removeField: string, whichHeader: string) => void;
  inverted?: boolean;
};
export const StructureField = SortableElement(
  ({ value, key, onRemoveField, inverted }: StructureFieldType) => {
    return (
      <List.Item key={value}>
        <List.Icon name="file outline" color={inverted === true ? undefined : 'black'} />
        <List.Content>
          <List.Header>
            {value}
            <List.Content floated="right">
              <Icon
                size="small"
                color={inverted === true ? 'olive' : 'brown'}
                name="chevron down"
                onClick={() => console.log('go down')}
              />
              <Icon
                style={{
                  marginLeft: 5,
                }}
                size="small"
                color={inverted === true ? 'olive' : 'brown'}
                name="chevron up"
                onClick={() => console.log('go up')}
              />
              <Icon
                size="small"
                color="grey"
                style={{
                  marginRight: 0,
                  marginLeft: 15,
                }}
                name="close"
                onClick={() => onRemoveField(value, key)}
              />
            </List.Content>
          </List.Header>
        </List.Content>
      </List.Item>
    );
  }
);

export type StructureFieldsType = {
  children: JSX.Element[];
  inverted: boolean;
};
export const StructureFields = SortableContainer(
  ({ children, inverted }: StructureFieldsType) => {
    return (
      <List selection verticalAlign="middle" inverted={inverted}>
        {children}
      </List>
    );
  }
);
