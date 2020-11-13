import { remote } from 'electron';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  Grid,
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
import { DARK_MODE, USER_FOLDER, defaultConfig } from '../utils/constants';

const HeaderPadding: React.CSSProperties = {
  paddingTop: 15,
};

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
type IProps = PropsFromRedux & RouteComponentProps;
type IStates = {
  resetConfirm: boolean;
  darkMode: boolean;
};
// #endregion

class Settings extends React.Component<IProps, IStates> {
  private pathInfoConfig = {
    color: 'teal',
    labelPosition: 'right',
    icon: 'folder open outline',
    content: 'Edit',
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      resetConfirm: false,
      darkMode: DARK_MODE,
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
    const { resetConfirm, darkMode } = this.state;

    return (
      <Grid inverted={DARK_MODE} padded className="maximize-height-with-nav">
        <Grid.Row color={DARK_MODE === true ? 'black' : undefined}>
          <Grid.Column>
            <Container>
              <Header
                style={HeaderPadding}
                inverted={DARK_MODE}
                as="h2"
                content="Application Settings"
                subheader="User preferences are saved on a static path. Meaning it cannot be changed. When other path preferences are changed their contents are moved as well."
              />
              <Form inverted={DARK_MODE}>
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
                  value={
                    newPaths.structures !== '' ? newPaths.structures : paths.structures
                  }
                  action={{
                    ...this.pathInfoConfig,
                    onClick: () => this.onPathChange('structures'),
                  }}
                />
                <Form.Input
                  inverted={DARK_MODE}
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
                  value={
                    newPaths.migrations !== '' ? newPaths.migrations : paths.migrations
                  }
                  action={{
                    ...this.pathInfoConfig,
                    onClick: () => this.onPathChange('migrations'),
                  }}
                />

                <Form.Input
                  inverted={DARK_MODE}
                  required
                  disabled
                  fluid
                  label="User Preferences"
                  value={paths.userSettings}
                />

                <Form.Radio
                  className={DARK_MODE === true ? 'inverted' : undefined}
                  label="Dark Mode (changes will take effect after you restart)"
                  slider
                  checked={darkMode}
                  onChange={() => {
                    localStorage.setItem('dark_mode', darkMode === true ? 'off' : 'on');
                    this.setState({
                      darkMode: !darkMode,
                    });
                  }}
                />

                <Form.Checkbox
                  name="autosave"
                  label="Auto Save"
                  checked={autoSave}
                  onChange={() => ValueUpdate('SETTINGS', 'autoSave', !autoSave)}
                />
                <Message
                  color={DARK_MODE === true ? 'black' : 'teal'}
                  header="Works on Content Structure & Database Migration"
                  list={[
                    'When creating a new structure or migration every minute progress is saved and will be kept until page is manually cleaned via button provided in that page or progress is saved manually by the user.',
                  ]}
                />

                <Button
                  color={DARK_MODE === true ? 'green' : undefined}
                  inverted={DARK_MODE}
                  icon="save"
                  content="Submit"
                  floated="left"
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
                  color={DARK_MODE === true ? 'orange' : undefined}
                  inverted={DARK_MODE}
                  icon="repeat"
                  content="Reset To Defaults"
                  floated="right"
                  loading={loading}
                  onClick={() => this.setState({ resetConfirm: true })}
                />
              </Form>
            </Container>
            <Confirm
              centered
              dimmer={DARK_MODE === true ? undefined : 'inverted'}
              open={resetConfirm}
              header="Reset Settings"
              content="This will reset settings to their defaults."
              onCancel={() => this.setState({ resetConfirm: false })}
              onConfirm={this.onResetConfirm}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connector(Settings);
