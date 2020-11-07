import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Container, Header, Form, Message } from 'semantic-ui-react';
import { RootState } from '../redux/store';
import { valueUpdate, changePath, saveSettings } from '../redux/actions';
import { NotificationManager } from '../components/Notification';

const { dialog } = require('electron').remote;

// #region Redux Configuration
const mapStateToProps = ({ settings }: RootState) => {
  const { paths, newPaths, autoSave } = settings;
  return {
    newPaths,
    paths,
    autoSave,
  };
};

const mapActionsToProps = {
  valueUpdate,
  changePath,
  saveSettings,
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
    const {
      paths,
      newPaths,
      autoSave,
      valueUpdate: ValueUpdate,
      saveSettings: SaveSettings,
    } = this.props;
    return (
      <Container>
        <Header
          as="h2"
          content="Application Settings"
          subheader="User preferences are saved on a static path. Meaning it cannot be changed. When Other path preferences are changed their contents are moved as well."
        />
        <Form
          onSubmit={() => {
            console.log('ON SUBMIT');

            NotificationManager.notificate({
              title: 'this title',
              message: 'asdasd',
              timeOut: 5500,
            });
          }}
        >
          <Form.Input
            fluid
            readOnly
            label="Structures Path"
            value={newPaths.structures !== '' ? newPaths.structures : paths.structures}
            action={{
              ...this.pathInfoConfig,
              onClick: () => this.onPathChange('structures'),
            }}
          />
          <Form.Input
            fluid
            readOnly
            label="Migrations Path"
            value={newPaths.migrations !== '' ? newPaths.migrations : paths.migrations}
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
          <Form.Checkbox
            name="autosave"
            label="Auto Save"
            checked={autoSave}
            onChange={() => ValueUpdate('SETTINGS', 'autoSave', !autoSave)}
          />
          <Message
            info
            header="Works on content structure and database migration."
            list={[
              'When creating a new structure or migration every minute progress is saved and will be kept until page is manually cleaned via button provided in that page or progress is saved manually by the user.',
            ]}
          />
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default connector(Settings);
