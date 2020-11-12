import React from 'react';
import { Grid, Card, Divider, Icon } from 'semantic-ui-react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
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
        itemsPerRow={3}
        className={inverted === true ? 'inverted transition-reset' : 'transition-reset'}
      >
        {children}
      </Card.Group>
    );
  }
);

// const DragHandle = SortableHandle(() => <span>::</span>);

export type StructureHeaderType = {
  header: string;
  inverted: boolean;
  items: Array<string>;
  onRemoveHeader: (removeHeader: string) => void;
  onRemoveField: (removeField: string, whichHeader: string) => void;
};
export const StructureHeader = SortableElement(
  ({ header, inverted, items, onRemoveHeader, onRemoveField }: StructureHeaderType) => {
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
                size="small"
                color={inverted === true ? 'red' : 'red'}
                name="eraser"
                onClick={() => onRemoveHeader(header)}
              />
            </Grid.Column>
          </Card.Header>
          <Divider />
          <Card.Description>
            <StructureFieldContainer
              inverted={inverted}
              axis="xy"
              // onSortEnd={this.onSortEnd}
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
