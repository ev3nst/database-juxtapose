import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContentStructures extends Component {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <h1>This is Content Structures..</h1>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(ContentStructures);
