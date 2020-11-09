import React from 'react';
import { Segment, Header, List, SemanticICONS, SemanticCOLORS } from 'semantic-ui-react';
import { IntroProgressProps } from './types';

class ProgressList extends React.PureComponent<IntroProgressProps> {
  resolveIconName(key: string): SemanticICONS {
    const { initStates, errors } = this.props;
    const typedKey = key as keyof typeof initStates;

    if (initStates[typedKey].loaded === true) {
      return 'check';
    }

    if (errors[typedKey].errorState === true) {
      return 'close';
    }

    return 'circle notch';
  }

  resolveIconColor(key: string): SemanticCOLORS {
    const { initStates, errors } = this.props;
    const typedKey = key as keyof typeof errors;

    if (initStates[typedKey].loaded === true) {
      return 'green';
    }

    if (errors[typedKey].errorState === true) {
      return 'red';
    }

    return 'black';
  }

  render(): JSX.Element {
    const { initStates, errors } = this.props;
    return (
      <>
        <Header as="h3" content="Progress" />
        <Segment>
          <List divided relaxed>
            <List.Item>
              <List.Icon
                name={this.resolveIconName('settings')}
                color={this.resolveIconColor('settings')}
                loading={initStates.settings.loading}
                size="large"
                verticalAlign="middle"
              />
              <List.Content>
                <List.Header>Settings</List.Header>
                <List.Description>
                  {errors.settings.errorMessage !== ''
                    ? errors.settings.errorMessage
                    : 'Gathering user preferences...'}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon
                name={this.resolveIconName('structure')}
                color={this.resolveIconColor('structure')}
                loading={initStates.structure.loading}
                size="large"
                verticalAlign="middle"
              />
              <List.Content>
                <List.Header>Structures</List.Header>
                <List.Description>
                  {errors.structure.errorMessage !== ''
                    ? errors.structure.errorMessage
                    : 'Checking structures folder and its contents...'}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon
                name={this.resolveIconName('migration')}
                color={this.resolveIconColor('migration')}
                loading={initStates.migration.loading}
                size="large"
                verticalAlign="middle"
              />
              <List.Content>
                <List.Header>Migrations</List.Header>
                <List.Description>
                  {errors.migration.errorMessage !== ''
                    ? errors.migration.errorMessage
                    : 'Checking migrations folder and its contents...'}
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </>
    );
  }
}

export default ProgressList;
