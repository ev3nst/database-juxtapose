import React from 'react';
import { Grid, Card, Divider, Icon } from 'semantic-ui-react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { StructureFieldContainer, StructureField } from './StructureField';
import { COLORS } from '../../../utils/constants';

export type StructureHeaderContainerType = {
  children: JSX.Element[];
  inverted: boolean;
};
export const StructureHeaderContainer = SortableContainer(
  ({ children, inverted }: StructureHeaderContainerType) => {
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

export type StructureHeaderType = {
  header: string;
  inverted: boolean;
  items: Array<string>;
  onRemoveHeader: (removeHeader: string) => void;
  onRemoveField: (removeField: string, whichHeader: string) => void;
  onSort: (oldIndex: number, newIndex: number, whichHeader: string) => void;
};
export const StructureHeader = SortableElement(
  ({
    header,
    inverted,
    items,
    onRemoveHeader,
    onRemoveField,
    onSort,
  }: StructureHeaderType) => {
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
            <StructureFieldContainer
              inverted={inverted}
              axis="y"
              lockAxis="y"
              distance={10}
              onSortEnd={({ oldIndex, newIndex }) => {
                onSort(oldIndex, newIndex, header);
              }}
            >
              {items.map((field, index) => (
                <StructureField
                  key={field}
                  field={field}
                  index={index}
                  header={header}
                  inverted={inverted}
                  onRemoveField={onRemoveField}
                />
              ))}
            </StructureFieldContainer>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
);
