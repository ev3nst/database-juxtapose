import { count } from 'console';
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { initSettings, initStructure } from '../redux/actions';
import { RootState } from '../redux/store';

//#region Redux Configuration
const mapStateToProps = ({ settings, structure }: RootState) => {
  return {
    errors: {
      "settings": {
        state: settings.errorState,
        message: settings.errorMessage,
      },
      "structure": {
        state: structure.errorState,
        message: structure.errorMessage,
      },
    },
  };
};

const mapActionsToProps = {
  initSettings,
  initStructure
};

const connector = connect(mapStateToProps, mapActionsToProps);
type IIntroProps = ConnectedProps<typeof connector>;
//#endregion

class Intro extends Component<IIntroProps> {
  componentDidMount() {
    this.props.initSettings();
  }

  componentDidUpdate() {
    console.log(this.props, 'FROM INTRO')
  }

  renderErrors() {
    const { errors } = this.props;

    const errorsToRender = [];
    let key: keyof typeof errors;
    for (key in errors)  {
      if(errors[key].state === true){
        errorsToRender.push(
          <div key={key}>
            <strong>{key}</strong>
            <p>{JSON.stringify(errors[key].message)}</p>
            <hr></hr>
          </div>
        )
      }
    }

    if(errorsToRender.length > 0) {
      return (
        <div>
          <h2>Errors:</h2>
          {errorsToRender}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        
      <h1>
          This is Intro...
      </h1>


        {this.renderErrors()}
      </div>
    );
  }
}

export default connector(Intro);
