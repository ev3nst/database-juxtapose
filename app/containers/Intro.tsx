import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLogMessage } from '../redux/actions';
import { Structures } from './partials';

class Intro extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <main>
      <Structures />
      <div>
        <button>start new migration</button>
        <button>create new structure</button>
        <button>migration wizard</button>
    <button>settings</button>
        
      </div>
      <div>
        <h1>Migrations</h1>
      </div>
      </main>
    )
  }
}

const mapStateToProps = ({ general }: any) => {
  const {
    logMessage,
  } = general;
  return {
    logMessage,
  };
};

const mapActionsToProps = {
  getLogMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(Intro);
