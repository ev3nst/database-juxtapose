import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../utils/routes.json';

class NewMigration extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>New Migration</h1>
        <Link to={routes.INTRO}>Go Back</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ new_migration }: any) => {
  // const { test } = new_migration;
  return {};
};

const mapActionsToProps = {
};

export default connect(mapStateToProps, mapActionsToProps)(NewMigration);
