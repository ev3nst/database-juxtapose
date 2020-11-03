import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  initSettings,
  initStructure,
  initMigration,
  initAppSuccess,
} from '../redux/actions';
import { RootState } from '../redux/store';

//#region Redux Configuration
const mapStateToProps = ({ settings, structure, migration }: RootState) => {
  return {
    errors: {
      settings: {
        state: settings.errorState,
        message: settings.errorMessage,
      },
      structure: {
        state: structure.errorState,
        message: structure.errorMessage,
      },
      migration: {
        state: structure.errorState,
        message: structure.errorMessage,
      },
    },
    initStates: {
      settings: {
        loading: settings.loading,
        loaded: settings.loaded,
      },
      structure: {
        loading: structure.loading,
        loaded: structure.loaded,
      },
      migration: {
        loading: migration.loading,
        loaded: migration.loaded,
      },
    },
    paths: settings.paths,
  };
};

const mapActionsToProps = {
  initAppSuccess,
  initSettings,
  initStructure,
  initMigration,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type IIntroProps = ConnectedProps<typeof connector>;
//#endregion

class Intro extends Component<IIntroProps> {
  componentDidMount() {
    this.props.initSettings();
  }

  componentDidUpdate(prevProps: IIntroProps) {
    const { initStates } = this.props;
    if (
      prevProps.initStates.settings.loaded == false &&
      initStates.settings.loaded === true
    ) {
      this.props.initStructure(this.props.paths.structures);
      this.props.initMigration(this.props.paths.migrations);
    }

    if (
      initStates.settings.loaded === true &&
      initStates.structure.loaded === true &&
      initStates.migration.loaded === true
    ) {
      this.props.initAppSuccess();
    }
  }

  renderStates() {
    const { initStates } = this.props;
    const statesToRender = [];

    let key: keyof typeof initStates;
    for (key in initStates) {
      statesToRender.push(
        <li key={key}>
          <strong>{key}:</strong> -{' '}
          {initStates[key].loading === true
            ? '[Loading..]'
            : initStates[key].loaded === true
            ? '[OK]'
            : '[FAILED]'}
        </li>
      );
    }

    return (
      <div>
        <h2>States:</h2>
        <ul>{statesToRender}</ul>
      </div>
    );
  }

  renderErrors() {
    const { errors } = this.props;
    const errorsToRender = [];

    let key: keyof typeof errors;
    for (key in errors) {
      errorsToRender.push(
        <div key={key}>
          <strong>{key}:</strong> - {errors[key].state === true ? 'ERR' : ''}
          <p>{errors[key].message !== null ? errors[key].message : ''}</p>
          <hr></hr>
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
    return (
      <div>
        <h1>This is Intro...</h1>

        {this.renderStates()}
        {this.renderErrors()}
      </div>
    );
  }
}

export default connector(Intro);
