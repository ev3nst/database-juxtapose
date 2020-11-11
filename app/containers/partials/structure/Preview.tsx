/* eslint-disable react/sort-comp */
import React from 'react';
import { Grid, Card, List, Icon, Divider } from 'semantic-ui-react';
import { COLORS } from '../../../utils/constants';
import { PreviewProps } from './types';

class Preview extends React.PureComponent<PreviewProps> {
  resolveStructureFields(key: string): JSX.Element {
    const { dataStructure, onRemoveField, inverted } = this.props;

    return (
      <List selection verticalAlign="middle" inverted={inverted}>
        {dataStructure[key].map((item) => (
          <List.Item key={item}>
            <List.Icon
              name="file outline"
              color={inverted === true ? undefined : 'black'}
            />
            <List.Content>
              <List.Header>
                {item}
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
                    onClick={() => onRemoveField(item, key)}
                  />
                </List.Content>
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }

  resolveStructure() {
    const { dataStructure, onRemoveHeader, inverted } = this.props;

    const keys = Object.keys(dataStructure);
    return (
      <Card.Group itemsPerRow={3} className={inverted === true ? 'inverted' : undefined}>
        {keys.map((header) => (
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
              <Card.Description>{this.resolveStructureFields(header)}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    );
  }

  render() {
    return this.resolveStructure();
  }
}

export default Preview;
