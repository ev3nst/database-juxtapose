import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid } from 'semantic-ui-react';
import {
  sortStructure,
  saveStructure,
  changeStructure,
  addOrRemoveHeader,
  addOrRemoveField,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { DARK_MODE } from '../../utils/constants';
import StructureList from './StructureList';
import StructureDetail from './StructureDetail';

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
  addOrRemoveHeader,
  addOrRemoveField,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type IProps = PropsFromRedux & RouteComponentProps;
// #endregion

const listBorder: React.CSSProperties = {
  borderRightWidth: 1,
  borderRightColor: DARK_MODE === true ? '#333333' : '#eeeeee',
  borderRightStyle: 'solid',
};

class Structure extends React.PureComponent<IProps> {
  render() {
    const {
      paths,
      structureFile,
      allStructures,
      autosaveLoading,
      dataStructure,
      changeStructure: ChangeStructure,
      saveStructure: SaveStructure,
      addOrRemoveHeader: AddOrRemoveHeader,
      addOrRemoveField: AddOrRemoveField,
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
            <StructureDetail
              paths={paths}
              activeFile={structureFile}
              autosaveLoading={autosaveLoading}
              dataStructure={dataStructure}
              SaveStructure={SaveStructure}
              SortStructure={SortStructure}
              AddOrRemoveHeader={AddOrRemoveHeader}
              AddOrRemoveField={AddOrRemoveField}
              errorState={errorState}
              errorMessage={errorMessage}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default connector(Structure);
