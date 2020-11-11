import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid } from 'semantic-ui-react';
import {
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
  const { allStructures, autosaveLoading, loading, loaded, dataStructure } = structure;
  const { paths } = settings;
  return { paths, allStructures, autosaveLoading, loading, loaded, dataStructure };
};

const mapActionsToProps = {
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
      allStructures,
      autosaveLoading,
      dataStructure,
      changeStructure: ChangeStructure,
      saveStructure: SaveStructure,
      manipulateStructureHeader: ManipulateStructureHeader,
      manipulateStructureField: ManipulateStructureField,
    } = this.props;
    return (
      <Grid inverted={DARK_MODE} padded className="maximize-height-with-nav">
        <Grid.Row color={DARK_MODE === true ? 'black' : undefined}>
          <Grid.Column width={3} style={listBorder}>
            <StructureList
              structuresPath={paths.structures}
              allStructures={allStructures}
              changeStructure={ChangeStructure}
            />
          </Grid.Column>
          <Grid.Column width={13}>
            <div style={itemSpace}>
              <StructureItem
                paths={paths}
                autosaveLoading={autosaveLoading}
                dataStructure={dataStructure}
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
