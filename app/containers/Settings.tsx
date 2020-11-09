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
  Confirm,
} from 'semantic-ui-react';
import { RootState } from '../redux/store';
import { valueUpdate, changePath, saveSettings, cancelSettings } from '../redux/actions';
import { USER_FOLDER, defaultConfig } from '../utils/constants';

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
  cancelSettings,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ISettingsProps = PropsFromRedux & RouteComponentProps;
type IStates = {
  resetConfirm: boolean;
};
// #endregion

class Settings extends React.Component<ISettingsProps, IStates> {
  private pathInfoConfig = {
    color: 'teal',
    labelPosition: 'right',
    icon: 'folder open outline',
    content: 'Edit',
  };

  constructor(props: ISettingsProps) {
    super(props);

    this.state = {
      resetConfirm: false,
    };
  }

  componentWillUnmount() {
    const { cancelSettings: CancelSettings } = this.props;
    CancelSettings();
  }

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

  onResetConfirm = () => {
    const {
      paths,
      changePath: ChangePath,
      valueUpdate: ValueUpdate,
      saveSettings: SaveSettings,
    } = this.props;

    const rawSettings = {
      paths: {
        ...paths,
      },
      autoSave: defaultConfig.autoSave,
    };

    const pathKeys = Object.keys(defaultConfig.paths);
    for (let i = 0; i < pathKeys.length; i += 1) {
      const pathKey = pathKeys[i] as keyof typeof defaultConfig.paths;
      if (
        pathKeys[i] !== 'userSettings' &&
        defaultConfig.paths[pathKey] !== paths[pathKey]
      ) {
        ChangePath(pathKey, defaultConfig.paths[pathKey]);
      }
    }

    ValueUpdate('SETTINGS', 'autoSave', defaultConfig.autoSave);
    SaveSettings(rawSettings, defaultConfig.paths);
    this.setState({ resetConfirm: false });
  };

  render() {
    const {
      loading,
      paths,
      newPaths,
      autoSave,
      valueUpdate: ValueUpdate,
      saveSettings: SaveSettings,
    } = this.props;
    const { resetConfirm } = this.state;

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
            content="Reset To Defaults"
            floated="right"
            loading={loading}
            onClick={() => this.setState({ resetConfirm: true })}
          />
        </Form>
        <Confirm
          centered
          dimmer="inverted"
          open={resetConfirm}
          header="Reset Settings"
          content="This will reset settings to their defaults."
          onCancel={() => this.setState({ resetConfirm: false })}
          onConfirm={this.onResetConfirm}
        />
      </Container>
    );
  }
}

export default connector(Settings);
