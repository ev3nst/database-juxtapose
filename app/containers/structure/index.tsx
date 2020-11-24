import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid } from 'semantic-ui-react';
import { NavigationFilelist } from '../../components';
import { saveStructure, changeStructure, deleteStructure } from '../../redux/actions';
import { ROUTES, DARK_MODE, STRUCTURE_AUTOSAVE_FILE } from '../../utils/constants';
import { RootState } from '../../redux/store';

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
            <NavigationFilelist
              title="Structure List"
              newFile={STRUCTURE_AUTOSAVE_FILE}
              onNavigate={this.navigate}
              activeFile={structureFile}
              filesPath={paths.structures}
              allFiles={allStructures}
              changeFile={ChangeStructure}
              deleteFile={DeleteStructure}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default connector(Structure);
