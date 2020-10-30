import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { initializeSettings } from '../redux/actions';
import { RootState } from '../redux/store';
import { SettingPathInterface } from '../types/settings.types';
import routes from '../utils/routes.json';

interface IMapStateToProps {
  paths: SettingPathInterface;
  loading: Boolean;
}

interface IMapDispatchToProps {
  initializeSettings: typeof initializeSettings;
}

interface State {}

class Intro extends Component<
  RouteComponentProps & IMapStateToProps & IMapDispatchToProps,
  State
> {
  componentDidMount() {
    this.props.initializeSettings();
  }

  render() {
    return (
      <div>
        <h1>this is intro</h1>
        <div>Is Loading: {JSON.stringify(this.props.loading)}</div>
        <div>Data: {JSON.stringify(this.props.paths)}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }: RootState) => {
  const { loading, paths } = settings;
  return {
    loading,
    paths,
  };
};

const mapActionsToProps = {
  initializeSettings,
};

export default connect(mapStateToProps, mapActionsToProps)(Intro);
