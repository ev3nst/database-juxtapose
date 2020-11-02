import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { saveStructure } from '../redux/actions';
import routes from '../utils/routes.json';

interface IMapStateToProps {}

interface IMapDispatchToProps {
  saveStructure: typeof saveStructure;
}

interface StructureState {
  newContentHeader: string;
  newContentColumn: string;
}

type StructureProps = RouteComponentProps &
  IMapStateToProps &
  IMapDispatchToProps;

class Structure extends Component<StructureProps, StructureState> {
  state: StructureState = {
    newContentHeader: '',
    newContentColumn: '',
  };

  componentDidMount() {
    console.log(this.state);
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

const mapStateToProps = ({ structure }: any) => {
  // const { test } = structure;
  return {};
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Structure);
