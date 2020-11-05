import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Container, Header, Form, Message } from 'semantic-ui-react';
import { RootState } from '../redux/store';
import { changePath } from '../redux/actions';

const { dialog } = require('electron').remote;

// #region Redux Configuration
const mapStateToProps = ({ settings }: RootState) => {
  const { paths, autoSave } = settings;
  return {
    paths,
    autoSave,
  };
};

const mapActionsToProps = {
  changePath,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ISettingsProps = PropsFromRedux & RouteComponentProps;
// #endregion

class Settings extends Component<ISettingsProps> {
  private pathInfoConfig = {
    color: 'teal',
    labelPosition: 'right',
    icon: 'folder open outline',
    content: 'Edit',
  };

  async onPathChange(key: string) {
    const { paths, changePath: ChangePath } = this.props;
    const resp = await dialog.showOpenDialog({
      title: 'THIS IS TITLE',
      message: 'message prop',
      defaultPath: paths.structures,
      properties: ['openDirectory', 'createDirectory'],
    });

    if (resp.filePaths[0] !== undefined && resp.filePaths[0] !== null) {
      ChangePath(key, resp.filePaths[0]);
    }
  }

  render() {
    const { paths, autoSave } = this.props;
    return (
      <Container>
        <Header
          as="h2"
          content="Application Settings"
          subheader="User preferences are saved on a static path. Meaning it cannot be changed. When Other path preferences are changed their contents are moved as well."
        />
        <Form>
          <Form.Input
            fluid
            readOnly
            label="Structures Path"
            value={paths.structures}
            action={{
              ...this.pathInfoConfig,
              onClick: () => this.onPathChange('structures'),
            }}
          />
          <Form.Input
            fluid
            readOnly
            label="Migrations Path"
            value={paths.migrations}
            action={{
              ...this.pathInfoConfig,
              onClick: () => this.onPathChange('migrations'),
            }}
          />
          <Form.Input
            required
            disabled
            fluid
            label="User Preferences"
            value={paths.userSettings}
          />
          <Form.Checkbox label="Auto Save" checked={autoSave} />
          <Message
            info
            header="Works on content structure and database migration."
            list={[
              'When creating a new structure or migration every minute progress is saved and will be kept until page is manually cleaned via button provided in that page or progress is saved manually by the user.',
            ]}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default connector(Settings);
