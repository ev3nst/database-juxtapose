import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLogMessage } from '../redux/actions';
import { Structures } from './partials';
import routes from '../utils/routes.json';

class Intro extends Component {
  componentDidMount() {}

  render() {
    return (
      <main>
        <Structures />

        <div>
          <Link to={routes.NEW_MIGRATION}>start new migration</Link>
          <Link to={routes.NEW_STRUCTURE}>create new structure</Link>
          <Link to={routes.MIGRATION_WIZARD}>migration wizard</Link>
          <Link to={routes.SETTINGS}>settings</Link>
        </div>

        <div>
          <h1>Migrations</h1>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ general }: any) => {
  const { logMessage } = general;
  return {
    logMessage,
  };
};

const mapActionsToProps = {
  getLogMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(Intro);
