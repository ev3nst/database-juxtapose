import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

export type StructureFieldType = {
  field: string;
  header: string;
  onRemoveField: (removeField: string, whichHeader: string) => void;
  inverted?: boolean;
};
export const StructureField = SortableElement(
  ({ field, header, onRemoveField, inverted }: StructureFieldType) => {
    return (
      <List.Item>
        <List.Icon name="file outline" color={inverted === true ? undefined : 'black'} />
        <List.Content>
          <List.Header>
            {field}
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
                onClick={() => onRemoveField(field, header)}
              />
            </List.Content>
          </List.Header>
        </List.Content>
      </List.Item>
    );
  }
);

export type StructureFieldContainerType = {
  children: JSX.Element[];
  inverted: boolean;
};
export const StructureFieldContainer = SortableContainer(
  ({ children, inverted }: StructureFieldContainerType) => {
    return (
      <List selection verticalAlign="middle" inverted={inverted}>
        {children}
      </List>
    );
  }
);
