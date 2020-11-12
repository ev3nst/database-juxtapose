import React from 'react';
import { Grid, Card, Divider, Icon } from 'semantic-ui-react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { COLORS } from '../../../utils/constants';

export type StructureHeaderContainerType = {
  children: JSX.Element[];
  inverted: boolean;
};
export const StructureHeaderContainer = SortableContainer(
  ({ children, inverted }: StructureHeaderContainerType) => {
    return (
      <Card.Group itemsPerRow={3} className={inverted === true ? 'inverted' : undefined}>
        {children}
      </Card.Group>
    );
  }
);

// const DragHandle = SortableHandle(() => <span>::</span>);

export type StructureHeaderType = {
  header: string;
  inverted: boolean;
  onRemoveHeader: (removeHeader: string) => void;
};
export const StructureHeader = SortableElement(
  ({ header, inverted, onRemoveHeader }: StructureHeaderType) => {
    return (
      <Card key={header} color={COLORS[Math.floor(Math.random() * COLORS.length)]}>
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
          <Card.Description>qqqq</Card.Description>
        </Card.Content>
      </Card>
    );
  }
);
