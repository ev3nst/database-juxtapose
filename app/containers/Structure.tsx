import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import {
  saveStructure,
  manipulateStructureHeader,
  manipulateStructureContent,
} from '../redux/actions';
import { RootState } from '../redux/store';
import { INTERVAL_TIMEOUT } from '../utils/constants';
import routes from '../utils/routes.json';
import { StructureObjectAction } from '../types/structure.types';

//#region Redux Configuration
const mapStateToProps = ({ structure, settings }: RootState) => {
  const { saveLoading, loading, loaded, newStructure } = structure;
  const { paths } = settings;
  return { saveLoading, loading, loaded, newStructure, paths };
};

const mapActionsToProps = {
  saveStructure,
  manipulateStructureHeader,
  manipulateStructureContent,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type IProps = PropsFromRedux & RouteComponentProps;

type IStates = {
  selectedHeader: string;
  newContentHeader: string;
  newContentColumn: string;
  showNotification: Boolean;
};
//#endregion

class Structure extends Component<IProps, IStates> {
  state: IStates = {
    selectedHeader: '',
    newContentHeader: '',
    newContentColumn: '',
    showNotification: false,
  };

  autosaveID!: NodeJS.Timeout;
  notificationID!: NodeJS.Timeout;

  componentDidMount() {
    this.autosaveID = setInterval(() => {
      this.onSaveStructure(true);
    }, INTERVAL_TIMEOUT);
  }

  onSaveStructure(isAutosave: Boolean = false) {
    this.setState({
      showNotification: true,
    });
    this.props.saveStructure(
      this.props.paths.structures,
      this.props.newStructure == undefined ? {} : this.props.newStructure,
      isAutosave
    );
  }

  componentWillUnmount() {
    clearInterval(this.autosaveID);
    clearInterval(this.notificationID);
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.saveLoading !== this.props.saveLoading) {
      this.notificationID = setTimeout(() => {
        this.setState({
          showNotification: false,
        });
      }, 1000);
    }
  }

  renderContentHeaders() {
    const { newStructure } = this.props;
    const render = [];

    let key: keyof typeof newStructure;
    for (key in newStructure) {
      render.push(
        <option key={key} value={key}>
          {key}
        </option>
      );
    }

    return render;
  }

  renderStructure() {
    const { newStructure } = this.props;
    const render = [];

    let key: keyof typeof newStructure;
    for (key in newStructure) {
      const keyToRemove = key;
      render.push(
        <div key={keyToRemove}>
          <h4>
            {keyToRemove} -
            <button onClick={() => this.VMStructure(keyToRemove, 'remove')}>
              Delete ({keyToRemove as string})
            </button>
          </h4>
        </div>
      );
      if (newStructure[keyToRemove].length > 0) {
        for (let i = 0; i < newStructure[keyToRemove].length; i++) {
          render.push(
            <li key={key + i}>
              {newStructure[keyToRemove][i]} -
              <button
                onClick={() =>
                  this.VMStructure(
                    newStructure[keyToRemove][i],
                    'remove',
                    keyToRemove
                  )
                }
              >
                Delete
              </button>
            </li>
          );
        }
      }
    }

    return render;
  }

  VMStructure(
    label: string,
    action: StructureObjectAction,
    header?: string
  ): Boolean {
    let keys: Array<string> = [];
    const value = label.trim();

    // If header is undefined then manipulation is about headers
    if (header === undefined) {
      keys = Object.keys(this.props.newStructure);
      if (
        (action == 'add' && keys.includes(value)) ||
        (action == 'remove' && !keys.includes(value))
      ) {
        console.log(
          this.props.newStructure,
          'Error: [' +
            action +
            '], --> key: ' +
            value +
            ' couldnt be manipulated.'
        );
        return false;
      }

      this.props.manipulateStructureHeader(value, action);
      return true;
    } else {
      keys = Object.values(this.props.newStructure[header]);
      if (
        (action == 'add' && keys.includes(value)) ||
        (action == 'remove' && !keys.includes(value))
      ) {
        console.log(
          this.props.newStructure[header],
          'Error: [' +
            action +
            '], --> key: ' +
            value +
            ' couldnt be manipulated.'
        );
        return false;
      }
      this.props.manipulateStructureContent(value, action, header);
      return true;
    }
  }

  render() {
    return (
      <div>
        <h1>New Structure</h1>
        <form>
          <div>
            <label>New Content</label>
            <br></br>
            <input
              type="text"
              value={this.state.newContentHeader}
              onChange={(val) =>
                this.setState({
                  newContentHeader: val.target.value,
                })
              }
            />
          </div>
          <button
            disabled={this.state.newContentHeader.length > 0 ? false : true}
            type="button"
            onClick={(event: React.SyntheticEvent<EventTarget>) => {
              event.preventDefault();
              this.VMStructure(this.state.newContentHeader, 'add');
            }}
          >
            Submit
          </button>
        </form>
        <hr></hr>
        <form>
          <div>
            <label>Sub Content</label>
            <br></br>
            <select
              onChange={(val) => {
                this.setState({
                  selectedHeader: val.target.value,
                });
              }}
            >
              <option value="">Select Header</option>
              {this.renderContentHeaders()}
            </select>
            <br></br>
            <input
              type="text"
              value={this.state.newContentColumn}
              onChange={(val) =>
                this.setState({
                  newContentColumn: val.target.value,
                })
              }
            />
          </div>
          <button
            disabled={
              this.state.newContentColumn.length > 0 &&
              this.state.selectedHeader !== ''
                ? false
                : true
            }
            type="button"
            onClick={(event: React.SyntheticEvent<EventTarget>) => {
              event.preventDefault();
              this.VMStructure(
                this.state.newContentColumn,
                'add',
                this.state.selectedHeader
              );
            }}
          >
            Submit
          </button>
        </form>
        <br></br>

        <div>
          <h2>New Structure:</h2>
          {this.renderStructure()}
        </div>

        <hr></hr>
        <Link to={routes.INTRO}>Go Back</Link>

        {this.state.showNotification === true ? (
          <div
            style={{
              position: 'absolute',
              top: 75,
              right: 25,
            }}
          >
            <b>SAVING....</b>
          </div>
        ) : (
          <button
            style={{
              position: 'absolute',
              top: 75,
              right: 25,
            }}
            onClick={() => this.onSaveStructure(true)}
          >
            <b>SAVE</b>
          </button>
        )}
      </div>
    );
  }
}

export default connector(Structure);
