import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid } from 'semantic-ui-react';
import {
  sortStructure,
  saveStructure,
  changeStructure,
  manipulateStructureHeader,
  manipulateStructureField,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { DARK_MODE } from '../../utils/constants';
import StructureItem from './StructureItem';
import StructureList from './StructureList';

// #region Redux Configuration
const mapStateToProps = ({ structure, settings }: RootState) => {
  const {
    structureFile,
    allStructures,
    autosaveLoading,
    loading,
    loaded,
    dataStructure,
    errorState,
    errorMessage,
  } = structure;
  const { paths } = settings;
  return {
    paths,
    structureFile,
    allStructures,
    autosaveLoading,
    loading,
    loaded,
    dataStructure,
    errorState,
    errorMessage,
  };
};

const mapActionsToProps = {
  sortStructure,
  saveStructure,
  changeStructure,
  manipulateStructureHeader,
  manipulateStructureField,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type IProps = PropsFromRedux & RouteComponentProps;
type IStates = {};
// #endregion

const listBorder: React.CSSProperties = {
  borderRightWidth: 1,
  borderRightColor: '#333',
  borderRightStyle: 'solid',
};
const itemSpace: React.CSSProperties = {
  marginLeft: 10,
  paddingRight: 10,
};
class Structure extends React.PureComponent<IProps, IStates> {
  render() {
    const {
      paths,
      structureFile,
      allStructures,
      autosaveLoading,
      dataStructure,
      changeStructure: ChangeStructure,
      saveStructure: SaveStructure,
      manipulateStructureHeader: ManipulateStructureHeader,
      manipulateStructureField: ManipulateStructureField,
      sortStructure: SortStructure,
      errorState,
      errorMessage,
    } = this.props;
    return (
      <Grid inverted={DARK_MODE} padded className="maximize-height-with-nav">
        <Grid.Row color={DARK_MODE === true ? 'black' : undefined}>
          <Grid.Column width={3} style={listBorder}>
            <StructureList
              activeFile={structureFile}
              structuresPath={paths.structures}
              allStructures={allStructures}
              changeStructure={ChangeStructure}
            />
          </Grid.Column>
          <Grid.Column width={13}>
            <div style={itemSpace}>
              <StructureItem
                activeFile={structureFile}
                errorState={errorState}
                errorMessage={errorMessage}
                paths={paths}
                autosaveLoading={autosaveLoading}
                dataStructure={dataStructure}
                sortStructure={SortStructure}
                SaveStructure={SaveStructure}
                ManipulateStructureHeader={ManipulateStructureHeader}
                ManipulateStructureField={ManipulateStructureField}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default connector(Structure);
