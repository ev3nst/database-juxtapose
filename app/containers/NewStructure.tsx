import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../utils/routes.json';

class NewStructure extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>New Structure</h1>
        <Link to={routes.INTRO}>Go Back</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ new_structure }: any) => {
  // const { test } = new_structure;
  return {};
};

const mapActionsToProps = {
};

export default connect(mapStateToProps, mapActionsToProps)(NewStructure);
