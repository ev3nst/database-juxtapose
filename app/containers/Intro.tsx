import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Header, Transition } from 'semantic-ui-react';
import {
  initSettings,
  initStructure,
  initMigration,
  initAppSuccess,
} from '../redux/actions';
import { ProgressPercentage, ProgressList } from './partials/Intro';
import { RootState } from '../redux/store';

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
// #endregion

class Intro extends Component<IProps> {
  private progressInterval = 250;

  private transitionInterval = 500;

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
      nextProps.initStates.migration.loaded !== initStates.migration.loaded ||
      nextProps.errors.settings.errorState !== errors.settings.errorState ||
      nextProps.errors.structure.errorState !== errors.structure.errorState ||
      nextProps.errors.migration.errorState !== errors.migration.errorState
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
      setTimeout(() => {
        InitAppSuccess();
      }, this.transitionInterval);
    }
  }

  checkIfLoaded = () => {
    const { initStates } = this.props;

    return (
      initStates.settings.loaded === true &&
      initStates.structure.loaded === true &&
      initStates.migration.loaded === true
    );
  };

  render() {
    const { initStates, errors } = this.props;
    return (
      <Transition
        visible={!this.checkIfLoaded()}
        animation="scale"
        duration={this.transitionInterval}
      >
        <Container style={{ marginTop: 50 }}>
          <Header
            as="h1"
            content="App is initializing..."
            subheader="Gathering information from user preferences and loadin necessary files."
          />
          <ProgressPercentage errors={errors} initStates={initStates} />
          <ProgressList errors={errors} initStates={initStates} />
        </Container>
      </Transition>
    );
  }
}

export default connector(Intro);
