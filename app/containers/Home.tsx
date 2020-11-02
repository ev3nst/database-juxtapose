import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Structures } from './partials';
import routes from '../utils/routes.json';

class Home extends Component {
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

const mapStateToProps = () => {
  return {};
};

const mapActionsToProps = {
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
