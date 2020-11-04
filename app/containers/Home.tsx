import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>asdasda
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Home);
