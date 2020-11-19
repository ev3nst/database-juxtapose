import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { StructureFieldSortable, StructureFieldContainerType } from '../types';

export const StructureField = SortableElement(
  ({ field, header, onRemoveField, inverted }: StructureFieldSortable) => {
    return (
      <List.Item className={inverted === true ? 'inverted' : undefined}>
        <List.Icon name="file outline" color={inverted === true ? undefined : 'black'} />
        <List.Content>
          <List.Header className="disable-select">
            {field}
            <List.Content floated="right">
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

export const StructureFieldContainer = SortableContainer(
  ({ children, inverted }: StructureFieldContainerType) => {
    return (
      <List selection verticalAlign="middle" inverted={inverted}>
        {children}
      </List>
    );
  }
);
