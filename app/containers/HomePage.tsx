import React, { Component } from 'react';
import Home from '../components/Home';
import { connect } from 'react-redux';
import { getLogMessage } from '../redux/actions';

class HomePage extends Component {

  componentDidMount() {
    this.props.getLogMessage();
  }

  render() {
    return (
      <>
      <Home />
        <h5>LogMessage: {this.props.logMessage}</h5>
      </>
    )
  }
}

const mapStateToProps = ({ general }: any) => {
  const {
    logMessage,
  } = general;
  return {
    logMessage,
  };
};

const mapActionsToProps = {
  getLogMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
