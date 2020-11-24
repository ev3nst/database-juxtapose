import React from 'react';
import { ActionCreator } from 'redux';
import { Segment, Header, List, Icon } from 'semantic-ui-react';
import {
  DARK_MODE,
  INTEGRATION_AUTOSAVE_NAME,
  INTEGRATION_AUTOSAVE_FILE,
} from '../../utils/constants';
import { IntegrationActionTypes } from '../../redux/integration/action.types';

type IntegrationListProps = {
  activeFile: string;
  integrationsPath: string;
  allIntegrations: Array<string>;
  changeIntegration: ActionCreator<IntegrationActionTypes>;
};
class IntegrationList extends React.Component<IntegrationListProps> {
  shouldComponentUpdate(nextProps: IntegrationListProps): boolean {
    const { allIntegrations, activeFile } = this.props;
    if (
      allIntegrations.length !== nextProps.allIntegrations.length ||
      activeFile !== nextProps.activeFile
    ) {
      return true;
    }

    return false;
  }

  renderIntegrationList(): JSX.Element[] {
    const {
      activeFile,
      integrationsPath,
      allIntegrations,
      changeIntegration,
    } = this.props;
    return allIntegrations.map((fileName) => (
      <List.Item
        active={activeFile === fileName}
        key={fileName}
        onClick={() => {
          changeIntegration(integrationsPath, `${fileName}.json`);
        }}
      >
        <List.Content>
          <List.Header>
            <Icon size="small" name="file alternate outline" /> {fileName}
          </List.Header>
        </List.Content>
      </List.Item>
    ));
  }

  render() {
    const { activeFile, integrationsPath, changeIntegration } = this.props;
    return (
      <Segment inverted={DARK_MODE} stacked>
        <Header
          as="h3"
          inverted={DARK_MODE}
          content="Integration List"
          subheader="Click to navigate"
          style={{
            marginTop: 1,
          }}
        />
        <List selection animated verticalAlign="middle" inverted={DARK_MODE}>
          <List.Item
            active={activeFile === INTEGRATION_AUTOSAVE_NAME}
            key={INTEGRATION_AUTOSAVE_FILE}
            onClick={() => {
              changeIntegration(integrationsPath, INTEGRATION_AUTOSAVE_FILE);
            }}
          >
            <List.Content>
              <List.Header>
                New <Icon size="small" name="plus" />
              </List.Header>
            </List.Content>
          </List.Item>
          {this.renderIntegrationList()}
        </List>
      </Segment>
    );
  }
}

export default IntegrationList;
