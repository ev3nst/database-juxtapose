import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Container,
  Segment,
  Header,
  Progress,
  List,
  Transition,
  SemanticICONS,
  SemanticCOLORS,
} from 'semantic-ui-react';
import {
  initSettings,
  initStructure,
  initMigration,
  initAppSuccess,
} from '../redux/actions';
import { RootState } from '../redux/store';
import {} from '../types';

// #region Redux Configuration
const mapStateToProps = ({ settings, structure, migration, intro }: RootState) => {
  return {
    errors: {
      settings: settings.initError,
      structure: structure.initError,
      migration: migration.initError,
    },
    initStates: {
      settings: settings.initLoading,
      structure: structure.initLoading,
      migration: migration.initLoading,
    },
    paths: settings.paths,
    introLoaded: intro.loaded,
  };
};

const mapActionsToProps = {
  initAppSuccess,
  initSettings,
  initStructure,
  initMigration,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type IProps = ConnectedProps<typeof connector>;
type IStates = {
  isInit: boolean;
};
// #endregion

class Intro extends Component<IProps, IStates> {
  private progressInterval = 2000;

  private transitionInterval = 500;

  constructor(props: IProps) {
    super(props);

    this.state = {
      isInit: true,
    };
  }

  componentDidMount() {
    const { initSettings: InitSettings } = this.props;

    setTimeout(() => {
      InitSettings();
    }, this.progressInterval);
  }

  shouldComponentUpdate(nextProps: IProps, prevState: IStates) {
    const { initStates, errors } = this.props;
    const { isInit } = this.state;
    if (
      nextProps.initStates.settings.loaded !== initStates.settings.loaded ||
      nextProps.initStates.structure.loaded !== initStates.structure.loaded ||
      nextProps.initStates.migration.loaded !== initStates.migration.loaded ||
      nextProps.errors.settings.errorState !== errors.settings.errorState ||
      nextProps.errors.structure.errorState !== errors.structure.errorState ||
      nextProps.errors.migration.errorState !== errors.migration.errorState ||
      prevState.isInit !== isInit
    ) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps: IProps) {
    const {
      introLoaded,
      initStates,
      paths,
      initAppSuccess: InitAppSuccess,
      initStructure: InitStructure,
      initMigration: InitMigration,
    } = this.props;
    if (
      prevProps.initStates.settings.loaded === false &&
      initStates.settings.loaded === true
    ) {
      setTimeout(() => {
        InitStructure(paths.structures);
        setTimeout(() => {
          InitMigration(paths.migrations);
        }, this.progressInterval);
      }, this.progressInterval);
    }

    if (this.checkIfLoaded() && introLoaded !== true) {
      // eslint-disable-next-line react/no-did-update-set-state
      // this.setState({ isInit: false });
      setTimeout(() => {
        InitAppSuccess();
      }, this.progressInterval);
    }
  }

  checkIfLoaded() {
    const { initStates } = this.props;

    return (
      initStates.settings.loaded === true &&
      initStates.structure.loaded === true &&
      initStates.migration.loaded === true
    );
  }

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

  renderProgress() {
    const { initStates, errors } = this.props;

    if (this.checkIfLoaded()) {
      return <Progress percent={100} success content="Initialized" />;
    }

    const loadingKeys = Object.keys(initStates);
    let loadedCount = loadingKeys.length;
    for (let i = 0; i < loadingKeys.length; i += 1) {
      const key = loadingKeys[i] as keyof typeof initStates;
      if (initStates[key].loaded === false) loadedCount -= 1;
    }

    let loadingPercentage: string | number = 0;
    if (loadedCount === loadingKeys.length) {
      loadingPercentage = 100;
    } else {
      loadingPercentage = loadedCount * (100 / loadingKeys.length);
    }

    loadingPercentage = loadingPercentage.toFixed(0);

    const errorKeys = Object.keys(errors);
    for (let i = 0; i < errorKeys.length; i += 1) {
      const key = errorKeys[i] as keyof typeof initStates;
      if (errors[key].errorState === true) {
        return (
          <Progress percent={loadingPercentage} error>
            There was an error
          </Progress>
        );
      }
    }

    return <Progress percent={loadingPercentage} progress active color="teal" />;
  }

  renderErrors() {
    const { errors } = this.props;
    const errorsToRender = [];

    const keys = Object.keys(errors);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i] as keyof typeof errors;
      errorsToRender.push(
        <div key={key}>
          <strong>{key}:</strong> - {errors[key].errorState === true ? 'ERR' : ''}
          <p>{errors[key].errorMessage !== null ? errors[key].errorMessage : ''}</p>
          <hr />
        </div>
      );
    }

    return (
      <div>
        <h2>Errors:</h2>
        {errorsToRender}
      </div>
    );
  }

  render() {
    const { initStates, errors } = this.props;
    const { isInit } = this.state;
    return (
      <Transition visible={isInit} animation="scale" duration={this.transitionInterval}>
        <Container style={{ marginTop: 50 }}>
          <Header
            as="h1"
            content="App is initializing..."
            subheader="Gathering information from user preferences and loadin necessary files."
          />
          {this.renderProgress()}

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
                    {errors.migration.errorMessage !== ''
                      ? errors.migration.errorMessage
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
                    {errors.migration.errorMessage !== ''
                      ? errors.migration.errorMessage
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
        </Container>
      </Transition>
    );
  }
}

export default connector(Intro);
