import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { initStructure, saveStructure } from '../redux/actions';
import routes from '../utils/routes.json';

//#region Redux Configuration
const mapStateToProps = ({ structure }: any) => {
  const { loading, loaded } = structure;
  return { loading, loaded };
};

const mapActionsToProps = {
  initStructure,
  saveStructure,
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

  componentDidMount() {
    if (this.props.loaded !== true) {
      this.props.initStructure();
    }
  }

  render() {
    return (
      <div>
        <h1>New Structure</h1>
        <form
          onSubmit={(event: React.SyntheticEvent<EventTarget>) => {
            event.preventDefault();
            console.log(this.state);
          }}
        >
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
          <button type="submit">Submit</button>
        </form>
        <hr></hr>
        <form>
          <div>
            <label>Sub Content</label>
            <br></br>
            <select>
              <option value="1">news</option>
              <option value="2">keywords</option>
            </select>
            <br></br>
            <input type="text" />
          </div>
          <button type="button">Submit</button>
        </form>
        <br></br>
        <Link to={routes.INTRO}>Go Back</Link>
      </div>
    );
  }
}

export default connector(Structure);
