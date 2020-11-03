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
type IStructureProps = PropsFromRedux & RouteComponentProps;
//#endregion

interface IStructureState {
  newContentHeader: string;
  newContentColumn: string;
}

class Structure extends Component<IStructureProps, IStructureState> {
  state: IStructureState = {
    newContentHeader: '',
    newContentColumn: '',
  };

  autosaveID!: NodeJS.Timeout;

  componentDidMount() {
    this.autosaveID = setInterval(() => {
      this.props.saveStructure(
        this.props.paths.structures,
        this.props.newStructure == undefined ? {} : this.props.newStructure,
        true
      );
    }, INTERVAL_TIMEOUT);
  }

  componentWillUnmount() {
    clearInterval(this.autosaveID);
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
          render.push(<li key={i}>{newStructure[keyToRemove][i]}</li>);
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
    // If header is undefined then manipulation is about headers
    if (header === undefined) {
      const keys = Object.keys(this.props.newStructure);
      if (
        (action == 'add' && keys.includes(label)) ||
        (action == 'remove' && !keys.includes(label))
      ) {
        console.log(
          this.props.newStructure,
          'Error: [' +
            action +
            '], --> key: ' +
            label +
            ' couldnt be manipulated.'
        );
        return false;
      }

      this.props.manipulateStructureHeader(label, action);
    }

    return true;
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
            <select>{this.renderContentHeaders()}</select>
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
          <button type="button">Submit</button>
        </form>
        <br></br>

        <div>
          <h2>New Structure:</h2>
          {this.renderStructure()}
        </div>

        <hr></hr>
        <Link to={routes.INTRO}>Go Back</Link>
      </div>
    );
  }
}

export default connector(Structure);
