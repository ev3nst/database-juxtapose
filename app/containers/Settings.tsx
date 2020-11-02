import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import routes from '../utils/routes.json';
import { changePath } from '../redux/actions';
import { SettingPathInterface } from '../types/settings.types';
const { dialog } = require('electron').remote;

interface IMapStateToProps {
  paths: SettingPathInterface;
}

interface IMapDispatchToProps {
  changePath: typeof changePath;
}

type SettingsProps = RouteComponentProps &
  IMapStateToProps &
  IMapDispatchToProps;

class Settings extends Component<SettingsProps> {
  componentDidMount() {}

  async onPathChange(key: string) {
    const resp = await dialog.showOpenDialog({
      title: 'THIS IS TITLE',
      buttonLabel: 'buttonLabel',
      message: 'message prop',
      defaultPath: this.props.paths.structures,
      properties: ['openDirectory', 'createDirectory'],
    });

    if (resp.filePaths[0] !== undefined && resp.filePaths[0] !== null) {
      this.props.changePath(key, resp.filePaths[0]);
    }
  }

  render() {
    return (
      <div>
        <h1>Settings</h1>

        <div>
          <input
            style={{ width: '100%' }}
            disabled
            type="text"
            placeholder="settings path..."
            value={this.props.paths.userSettings}
          />
          <br />
          <button type="button" onClick={() => this.onPathChange('settings')}>
            change
          </button>
        </div>
        <hr></hr>
        <div>
          <input
            style={{ width: '100%' }}
            disabled
            type="text"
            placeholder="structures path..."
            value={this.props.paths.structures}
          />
          <br />
          <button type="button" onClick={() => this.onPathChange('settings')}>
            change
          </button>
        </div>
        <hr></hr>
        <div>
          <input
            style={{ width: '100%' }}
            disabled
            type="text"
            placeholder="migrations path..."
            value={this.props.paths.migrations}
          />
          <br />
          <button type="button" onClick={() => this.onPathChange('settings')}>
            change
          </button>
        </div>
        <hr></hr>

        <Link to={routes.INTRO}>Go Back</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }: RootState): IMapStateToProps => {
  const { paths } = settings;
  return {
    paths,
  };
};

const mapActionsToProps = {
  changePath,
};

export default connect<
  IMapStateToProps,
  IMapDispatchToProps,
  SettingsProps,
  RootState
>(
  mapStateToProps,
  mapActionsToProps
)(Settings);
