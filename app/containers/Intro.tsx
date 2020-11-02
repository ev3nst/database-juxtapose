import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLogMessage } from '../redux/actions';
import { Structures } from './partials';
import routes from '../utils/routes.json';
import { RootState } from '../redux/store';

class Intro extends Component {
  componentDidMount() {}

  render() {
    return (
      <main>
        <Structures />

        <div>
          <Link to={routes.NEW_MIGRATION}>start new migration</Link>
          <br></br>
          <Link to={routes.STRUCTURE}>create new structure</Link>
          <br></br>
          <Link to={routes.MIGRATION_WIZARD}>migration wizard</Link>
          <br></br>
          <Link to={routes.SETTINGS}>settings</Link>
        </div>

        <div>
          <h1>Migrations</h1>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ general }: RootState) => {
  const { logMessage } = general;
  return {
    logMessage,
  };
};

const mapActionsToProps = {
  getLogMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(Intro);
