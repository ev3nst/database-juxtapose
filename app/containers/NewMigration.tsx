import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewMigration extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>New Migration</h1>
      </div>
    );
  }
}

const mapStateToProps = () => {
  // const { test } = new_migration;
  return {};
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(NewMigration);
