import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Grid, Container, Header, Transition, Message, Button } from 'semantic-ui-react';
import {
  initSettings,
  initStructure,
  initIntegration,
  initAppSuccess,
} from '../../redux/actions';
import ProgressPercentage from './ProgressPercentage';
import ProgressList from './ProgressList';
import { AppActions } from '../../components';
import { RootState } from '../../redux/store';
import { DARK_MODE } from '../../utils/constants';

// #region Redux Configuration
const mapStateToProps = ({ settings, structure, integration, intro }: RootState) => {
  return {
    errors: {
      settings: settings.initError,
      structure: structure.initError,
      integration: integration.initError,
    },
    initStates: {
      settings: settings.initLoading,
      structure: structure.initLoading,
      integration: integration.initLoading,
    },
    paths: settings.paths,
    introLoaded: intro.loaded,
  };
};

const mapActionsToProps = {
  initAppSuccess,
  initSettings,
  initStructure,
  initIntegration,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type IProps = ConnectedProps<typeof connector>;
// #endregion

class Intro extends Component<IProps> {
  private progressInterval = 50;

  private transitionInterval = 250;

  componentDidMount() {
    const { initSettings: InitSettings } = this.props;

    setTimeout(() => {
      InitSettings();
    }, this.progressInterval);
  }

  shouldComponentUpdate(nextProps: IProps) {
    const { initStates, errors } = this.props;
    if (
      nextProps.initStates.settings.loaded !== initStates.settings.loaded ||
      nextProps.initStates.structure.loaded !== initStates.structure.loaded ||
      nextProps.initStates.integration.loaded !== initStates.integration.loaded ||
      nextProps.errors.settings.errorState !== errors.settings.errorState ||
      nextProps.errors.structure.errorState !== errors.structure.errorState ||
      nextProps.errors.integration.errorState !== errors.integration.errorState
    ) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps: IProps) {
    const { introLoaded, initStates, initAppSuccess: InitAppSuccess } = this.props;
    if (
      prevProps.initStates.settings.loaded === false &&
      initStates.settings.loaded === true
    ) {
      this.onInit();
    }

    if (this.checkIfLoaded() && introLoaded !== true) {
      setTimeout(() => {
        InitAppSuccess();
      }, this.transitionInterval);
    }
  }

  onInit() {
    const {
      paths,
      initStructure: InitStructure,
      initIntegration: InitIntegration,
    } = this.props;
    setTimeout(() => {
      InitStructure(paths.structures);
      setTimeout(() => {
        InitIntegration(paths.integrations);
      }, this.progressInterval);
    }, this.progressInterval);
  }

  checkIfLoaded = () => {
    const { initStates } = this.props;

    return (
      initStates.settings.loaded === true &&
      initStates.structure.loaded === true &&
      initStates.integration.loaded === true
    );
  };

  renderCorruptedData(): JSX.Element {
    const { errors, paths } = this.props;

    return (
      <Transition
        visible={
          errors.settings.errorState === false &&
          (errors.structure.errorState === true || errors.integration.errorState === true)
        }
        animation="scale"
        duration={this.transitionInterval}
      >
        <>
          <Message
            color={DARK_MODE === true ? 'black' : 'red'}
            floating
            header="Failed to initialize"
            list={[
              `User settings file contains corrupted data. If you want to reset this file to default press Reset button below or retry the initialization. This action will not restore integration and structure files. Settings file can be fixed manually at ${paths.userSettings}`,
            ]}
          />
          <Button.Group inverted={DARK_MODE}>
            <Button
              color={DARK_MODE === true ? 'teal' : undefined}
              inverted={DARK_MODE}
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
            <Button.Or />
            <Button
              color={DARK_MODE === true ? 'red' : 'black'}
              onClick={() => {
                const { initSettings: InitSettings } = this.props;

                InitSettings(true);
                window.location.reload();
              }}
              inverted={DARK_MODE}
            >
              Reset
            </Button>
          </Button.Group>
        </>
      </Transition>
    );
  }

  render() {
    const { initStates, errors } = this.props;
    return (
      <>
        <AppActions classNames="manually-fixed" />
        <Grid inverted={DARK_MODE} padded className="maximize-height">
          <Grid.Row color={DARK_MODE === true ? 'black' : undefined}>
            <Grid.Column>
              <Transition
                visible={!this.checkIfLoaded()}
                animation="scale"
                duration={this.transitionInterval}
              >
                <Container style={{ paddingTop: 40 }}>
                  <Header
                    inverted={DARK_MODE}
                    as="h1"
                    content="App is initializing..."
                    subheader="Gathering information from user preferences and loadin necessary files."
                  />
                  <ProgressPercentage
                    inverted={DARK_MODE}
                    errors={errors}
                    initStates={initStates}
                  />
                  <ProgressList
                    inverted={DARK_MODE}
                    errors={errors}
                    initStates={initStates}
                  />
                  {this.renderCorruptedData()}
                </Container>
              </Transition>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default connector(Intro);
