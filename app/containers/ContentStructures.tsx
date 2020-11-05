import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContentStructures extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <h1>This is Content Structures..</h1>
      </>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(ContentStructures);
