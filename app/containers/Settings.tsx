import { remote } from 'electron';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  Container,
  Header,
  Form,
  Button,
  Message,
  Icon,
  Popup,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { RootState } from '../redux/store';
import { valueUpdate, changePath, saveSettings } from '../redux/actions';
import { CONFIG_PATH, USER_FOLDER } from '../utils/constants';

// #region Redux Configuration
const mapStateToProps = ({ settings }: RootState) => {
  const { paths, newPaths, autoSave, loading, errorState, errorMessage } = settings;
  return {
    newPaths,
    paths,
    autoSave,
    loading,
    errorState,
    errorMessage,
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

class Settings extends React.Component<ISettingsProps> {
  private pathInfoConfig = {
    color: 'teal',
    labelPosition: 'right',
    icon: 'folder open outline',
    content: 'Edit',
  };

  async onPathChange(key: string) {
    const { paths, changePath: ChangePath } = this.props;
    const pathKey = key as keyof typeof paths;
    const resp = await remote.dialog.showOpenDialog({
      title: 'THIS IS TITLE',
      message: 'message prop',
      defaultPath: USER_FOLDER,
      properties: ['openDirectory', 'createDirectory', 'dontAddToRecent'],
    });
    if (
      resp.filePaths[0] !== undefined &&
      resp.filePaths[0] !== null &&
      paths[pathKey] !== `${resp.filePaths[0]}\\`
    ) {
      ChangePath(pathKey, `${resp.filePaths[0]}\\`);
    }
  }

  render() {
    const {
      loading,
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
          subheader="User preferences are saved on a static path. Meaning it cannot be changed. When other path preferences are changed their contents are moved as well."
        />
        <Form>
          <Form.Input
            fluid
            readOnly
            label={{
              children: (
                <div>
                  Structures Path &nbsp;
                  <Popup
                    mouseEnterDelay={400}
                    content="Folder where all structure files are stored. When changed backup zip is created at application folder before moving all contents."
                    trigger={<Icon name="info circle" />}
                  />
                </div>
              ),
            }}
            value={newPaths.structures !== '' ? newPaths.structures : paths.structures}
            action={{
              ...this.pathInfoConfig,
              onClick: () => this.onPathChange('structures'),
            }}
          />
          <Form.Input
            fluid
            readOnly
            label={{
              children: (
                <div>
                  Migrations Path &nbsp;
                  <Popup
                    mouseEnterDelay={400}
                    content="Folder where all migration files are stored. When changed backup zip is created at application folder before moving all contents."
                    trigger={<Icon name="info circle" />}
                  />
                </div>
              ),
            }}
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
            header="Works on Content Structure & Database Migration"
            list={[
              'When creating a new structure or migration every minute progress is saved and will be kept until page is manually cleaned via button provided in that page or progress is saved manually by the user.',
            ]}
          />

          <Button
            icon="save"
            content="Submit"
            floated="left"
            type="button"
            loading={loading}
            onClick={() => {
              SaveSettings(
                {
                  paths: {
                    ...paths,
                  },
                  autoSave,
                },
                newPaths
              );
            }}
          />

          <Button
            icon="repeat"
            content="Reset"
            floated="right"
            loading={loading}
            onClick={() => {
              console.log('on reset');
            }}
          />
        </Form>
      </Container>
    );
  }
}

export default connector(Settings);
