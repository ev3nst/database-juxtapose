import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../utils/routes.json';

class MigrationWizard extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Migration Wizard</h1>
        <Link to={routes.INTRO}>Go Back</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ migration_wizard }: any) => {
  // const { test } = migration_wizard;
  return {};
};

const mapActionsToProps = {
};

export default connect(mapStateToProps, mapActionsToProps)(MigrationWizard);
