import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import routes from '../utils/routes.json';

class MigrationWizard extends Component<RouteComponentProps> {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Migration Wizard</h1>
        <button
          type="button"
          onClick={() => {
            this.props.history.push(routes.CONTENT_STRUCTURES);
          }}
        >
          GO BACK
        </button>
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
