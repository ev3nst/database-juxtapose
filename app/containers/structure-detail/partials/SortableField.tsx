import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { SortableFieldType, SortableFieldContainerType } from '../types';

export const SortableField = SortableElement(
  ({ field, header, onRemoveField, inverted }: SortableFieldType) => {
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
                  paddingLeft: 12,
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

export const SortableFieldContainer = SortableContainer(
  ({ children, inverted }: SortableFieldContainerType) => {
    return (
      <List selection verticalAlign="middle" inverted={inverted}>
        {children}
      </List>
    );
  }
);
