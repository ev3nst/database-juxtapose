import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import routes from '../utils/routes.json';
import { changePath } from '../redux/actions';
import { SettingPathInterface } from '../types/settings.types';

interface IMapStateToProps {
  paths: SettingPathInterface;
}

interface IMapDispatchToProps {
  changePath: typeof changePath;
}

interface State {}

class Settings extends Component<
  RouteComponentProps & IMapStateToProps & IMapDispatchToProps,
  State
> {
  readonly state: State = {
    count: 0,
  };

  componentDidMount() {
    this.props.changePath();
  }

  render() {
    return (
      <div>
        <h1>Settings</h1>
        <form>
          <input
            name="settingsPath"
            type="text"
            placeholder="path placeholder"
            value={this.props.paths.settings}
            onChange={(val) =>
              this.props.changePath('settings', val.target.value)
            }
          />
        </form>

        <Link to={routes.INTRO}>Go Back</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }: any) => ({
  paths: settings.paths,
});

const mapActionsToProps = {
  changePath,
};

export default connect<IMapStateToProps, IMapDispatchToProps>(
  mapStateToProps,
  mapActionsToProps
)(Settings);
