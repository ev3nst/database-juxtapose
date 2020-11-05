import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

class MigrationWizard extends Component<RouteComponentProps> {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Migration Wizard</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ migration_wizard }: any) => {
  // const { test } = migration_wizard;
  return {};
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(MigrationWizard);
