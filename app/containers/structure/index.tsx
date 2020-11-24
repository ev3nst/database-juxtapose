import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid } from 'semantic-ui-react';
import { saveStructure, changeStructure, deleteStructure } from '../../redux/actions';
import { RootState } from '../../redux/store';
import { ROUTES, DARK_MODE } from '../../utils/constants';
import StructureList from './StructureList';

// #region Redux Configuration
const mapStateToProps = ({ structure, settings }: RootState) => {
  const { structureFile, allStructures } = structure;
  const { paths } = settings;
  return {
    paths,
    structureFile,
    allStructures,
  };
};

const mapActionsToProps = {
  saveStructure,
  changeStructure,
  deleteStructure,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type IProps = PropsFromRedux & RouteComponentProps;
// #endregion

class Structure extends React.PureComponent<IProps> {
  navigate = () => {
    const { history } = this.props;
    history.push(ROUTES.STRUCTURE_DETAIL);
  };

  render() {
    const {
      paths,
      structureFile,
      allStructures,
      changeStructure: ChangeStructure,
      deleteStructure: DeleteStructure,
    } = this.props;

    return (
      <Grid inverted={DARK_MODE} padded className="maximize-height-with-nav">
        <Grid.Row color={DARK_MODE === true ? 'black' : undefined}>
          <Grid.Column>
            <StructureList
              onNavigate={this.navigate}
              structureFile={structureFile}
              structuresPath={paths.structures}
              allStructures={allStructures}
              changeStructure={ChangeStructure}
              deleteStructure={DeleteStructure}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default connector(Structure);
