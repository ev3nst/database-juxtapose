import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  saveStructure,
  manipulateStructureHeader,
  manipulateStructureContent,
} from '../redux/actions';
import { RootState } from '../redux/store';
import { INTERVAL_TIMEOUT } from '../utils/constants';
import { StructureObjectAction } from '../types/structure.types';

// #region Redux Configuration
const mapStateToProps = ({ structure, settings }: RootState) => {
  const { loading, loaded, newStructure } = structure;
  const { paths } = settings;
  return { loading, loaded, newStructure, paths };
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
  showNotification: boolean;
};
// #endregion

class Structure extends Component<IProps, IStates> {
  autosaveID!: NodeJS.Timeout;

  notificationID!: NodeJS.Timeout;

  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedHeader: '',
      newContentHeader: '',
      newContentColumn: '',
      showNotification: false,
    };
  }

  componentDidMount() {
    this.autosaveID = setInterval(() => {
      this.onSaveStructure(true);
    }, INTERVAL_TIMEOUT);
  }

  componentDidUpdate(prevProps: IProps) {
    const { loading } = this.props;
    if (prevProps.loading !== loading) {
      this.notificationID = setTimeout(() => {
        this.setState({
          showNotification: false,
        });
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.autosaveID);
    clearInterval(this.notificationID);
  }

  onSaveStructure(isAutosave: boolean = false) {
    const { paths, newStructure, saveStructure: SaveStructure } = this.props;
    this.setState({
      showNotification: true,
    });
    SaveStructure(
      paths.structures,
      newStructure === undefined ? {} : newStructure,
      isAutosave
    );
  }

  VMStructure(label: string, action: StructureObjectAction, header?: string): boolean {
    const {
      newStructure,
      manipulateStructureContent: ManipulateStructureContent,
    } = this.props;
    let keys: Array<string> = [];
    const value = label.trim();

    // If header is undefined then manipulation is about headers
    if (header === undefined) {
      keys = Object.keys(newStructure);
      if (
        (action === 'add' && keys.includes(value)) ||
        (action === 'remove' && !keys.includes(value))
      ) {
        return false;
      }

      ManipulateStructureContent(value, action);
      return true;
    }
    keys = Object.values(newStructure[header]);
    if (
      (action === 'add' && keys.includes(value)) ||
      (action === 'remove' && !keys.includes(value))
    ) {
      return false;
    }
    ManipulateStructureContent(value, action, header);
    return true;
  }

  renderContentHeaders() {
    const { newStructure } = this.props;
    const render = [];

    const keys = Object.keys(newStructure);
    for (let i = 0; i < keys.length; i += 1) {
      render.push(
        <option key={keys[i]} value={keys[i]}>
          {keys[i]}
        </option>
      );
    }
    return render;
  }

  renderStructure() {
    const { newStructure } = this.props;
    const render = [];

    const keys = Object.keys(newStructure);
    for (let i = 0; i < keys.length; i += 1) {
      const keyToRemove = keys[i];
      render.push(
        <div key={keyToRemove}>
          <h4>
            {keyToRemove} -
            <button type="button" onClick={() => this.VMStructure(keyToRemove, 'remove')}>
              Delete ({keyToRemove as string})
            </button>
          </h4>
        </div>
      );
      if (newStructure[keyToRemove].length > 0) {
        for (let index = 0; index < newStructure[keyToRemove].length; index += 1) {
          render.push(
            <li key={keyToRemove + index}>
              {newStructure[keyToRemove][index]} -
              <button
                type="button"
                onClick={() =>
                  this.VMStructure(
                    newStructure[keyToRemove][index],
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

  render() {
    const {
      newContentHeader,
      newContentColumn,
      selectedHeader,
      showNotification,
    } = this.state;

    return (
      <div>
        <h1>New Structure</h1>
        <form>
          <div>
            <h5>New Content</h5>
            <input
              type="text"
              value={newContentHeader}
              onChange={(val) =>
                this.setState({
                  newContentHeader: val.target.value,
                })
              }
            />
          </div>
          <button
            disabled={!(newContentHeader.length > 0)}
            type="button"
            onClick={(event: React.SyntheticEvent<EventTarget>) => {
              event.preventDefault();
              this.VMStructure(newContentHeader, 'add');
            }}
          >
            Submit
          </button>
        </form>
        <hr />
        <form>
          <div>
            <h5>Sub Content</h5>
            <br />
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
            <br />
            <input
              type="text"
              value={newContentColumn}
              onChange={(val) =>
                this.setState({
                  newContentColumn: val.target.value,
                })
              }
            />
          </div>
          <button
            disabled={!(newContentColumn.length > 0 && selectedHeader !== '')}
            type="button"
            onClick={(event: React.SyntheticEvent<EventTarget>) => {
              event.preventDefault();
              this.VMStructure(newContentColumn, 'add', selectedHeader);
            }}
          >
            Submit
          </button>
        </form>
        <br />

        <div>
          <h2>New Structure:</h2>
          {this.renderStructure()}
        </div>

        <hr />

        {showNotification === true ? (
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
            type="button"
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
