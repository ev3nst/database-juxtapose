import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import routes from '../utils/routes.json';
import { changePath } from '../redux/actions';
const { dialog } = require('electron').remote;

//#region Redux Configuration
const mapStateToProps = ({ settings }: RootState) => {
  const { paths, autoSave, errorState, errorMessage } = settings;
  return {
    paths,
  };
};

const mapActionsToProps = {
  changePath,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ISettingsProps = PropsFromRedux & RouteComponentProps;
//#endregion

class Settings extends Component<ISettingsProps> {
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

export default connector(Settings);
