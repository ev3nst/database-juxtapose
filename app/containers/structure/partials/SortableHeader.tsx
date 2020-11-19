import React from 'react';
import { Grid, Card, Divider, Icon } from 'semantic-ui-react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { SortableFieldContainer, SortableField } from './SortableField';
import { COLORS } from '../../../utils/constants';
import { SortableHeaderContainerType, SortableHeaderType } from '../types';

export const SortableHeaderContainer = SortableContainer(
  ({ children, inverted }: SortableHeaderContainerType) => {
    return (
      <Card.Group
        className={inverted === true ? 'inverted transition-reset' : 'transition-reset'}
      >
        {children}
      </Card.Group>
    );
  }
);

const DragHandle = SortableHandle(() => <Icon size="small" color="grey" name="move" />);

export const SortableHeader = SortableElement(
  ({
    header,
    inverted,
    items,
    onRemoveHeader,
    onRemoveField,
    onSort,
  }: SortableHeaderType) => {
    return (
      <Card color={COLORS[Math.floor(Math.random() * COLORS.length)]}>
        <Card.Content>
          <Card.Header>
            <Icon
              style={{ marginRight: 5 }}
              color={inverted === true ? undefined : 'black'}
              name="folder outline"
            />
            {header}
            <Grid.Column floated="right">
              <Icon
                style={{ marginRight: 15 }}
                size="small"
                color="red"
                name="eraser"
                onClick={() => onRemoveHeader(header)}
              />
              <DragHandle />
            </Grid.Column>
          </Card.Header>
          <Divider />
          <Card.Description>
            <SortableFieldContainer
              inverted={inverted}
              axis="y"
              lockAxis="y"
              distance={10}
              onSortEnd={({ oldIndex, newIndex }) => {
                onSort(oldIndex, newIndex, header);
              }}
            >
              {items.map((field, index) => (
                <SortableField
                  key={field.fieldName}
                  field={field.fieldName}
                  index={index}
                  header={header}
                  inverted={inverted}
                  onRemoveField={onRemoveField}
                />
              ))}
            </SortableFieldContainer>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
);
