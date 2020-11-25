import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid, Message, Button, Icon, Loader } from 'semantic-ui-react';
import { FormFileSegment } from '../../components';
import StructureItem from './StructureItem';
import StructureDataTypes from './StructureDataTypes';
import {
  sortStructure,
  saveStructure,
  addOrRemoveHeader,
  addOrRemoveField,
  manipulateFieldData,
  metaChange,
} from '../../redux/actions';
import {
  ROUTES,
  DARK_MODE,
  AUTOSAVE_INTERVAL,
  EMPTY_STRUCTURE,
  STRUCTURE_AUTOSAVE_NAME,
} from '../../utils/constants';
import { RootState } from '../../redux/store';

const GridPadding: React.CSSProperties = {
  paddingLeft: 25,
  paddingRight: 25,
};

// #region Redux Configuration
const mapStateToProps = ({ structure, settings }: RootState) => {
  const {
    structureFile,
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
  addOrRemoveHeader,
  addOrRemoveField,
  metaChange,
  manipulateFieldData,
};

const connector = connect(mapStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type IProps = PropsFromRedux & RouteComponentProps;
type IStates = {
  showDataTypes: boolean;
  showNotification: boolean;
};
// #endregion

class StructureDetail extends React.PureComponent<IProps, IStates> {
  autosaveID!: NodeJS.Timeout;

  notificationID!: NodeJS.Timeout;

  constructor(props: IProps) {
    super(props);

    this.state = {
      showDataTypes: false,
      showNotification: false,
    };
  }

  componentDidMount() {
    this.autosaveID = setInterval(() => {
      const {
        errorState,
        structureFile,
        paths,
        dataStructure,
        saveStructure: SaveStructure,
      } = this.props;
      if (errorState !== true && structureFile !== undefined) {
        this.setState({
          showNotification: true,
        });
        SaveStructure(
          paths.structures,
          dataStructure === undefined ? EMPTY_STRUCTURE : dataStructure,
          structureFile,
          true
        );
      }
    }, AUTOSAVE_INTERVAL);
  }

  componentDidUpdate(nextProps: IProps) {
    const { autosaveLoading } = this.props;
    if (nextProps.autosaveLoading !== autosaveLoading) {
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

  onGoBack = () => {
    const { history } = this.props;
    history.push(ROUTES.STRUCTURES);
  };

  render() {
    const {
      paths,
      structureFile,
      dataStructure,
      saveStructure: SaveStructure,
      sortStructure: SortStructure,
      addOrRemoveHeader: AddOrRemoveHeader,
      addOrRemoveField: AddOrRemoveField,
      manipulateFieldData: ManipulateFieldData,
      metaChange: MetaChange,
      errorState,
      errorMessage,
    } = this.props;
    const { showDataTypes, showNotification } = this.state;

    if (errorState === true) {
      return (
        <Message
          color={DARK_MODE === true ? 'black' : 'red'}
          floating
          header="Something went wrong."
          list={[errorMessage]}
        />
      );
    }

    return (
      <Grid inverted={DARK_MODE} padded className="maximize-height-with-nav">
        <Grid.Row color={DARK_MODE === true ? 'black' : undefined}>
          <Grid.Column style={GridPadding}>
            <FormFileSegment
              title="Structure"
              defaultFileName={STRUCTURE_AUTOSAVE_NAME}
              savePath={paths.structures}
              emptyData={EMPTY_STRUCTURE}
              activeFile={structureFile}
              dataToSave={dataStructure}
              SaveFile={SaveStructure}
              onGoBack={this.onGoBack}
              extraButtons={
                <Button
                  icon
                  color="teal"
                  size="tiny"
                  inverted={DARK_MODE}
                  onClick={() => this.setState({ showDataTypes: !showDataTypes })}
                >
                  <span style={{ marginRight: 5 }}>
                    Switch to {showDataTypes === false ? 'Data Types' : 'Structure'}
                  </span>
                  <Icon name={showDataTypes === false ? 'clone outline' : 'sitemap'} />
                </Button>
              }
            />

            {showDataTypes === false ? (
              <StructureItem
                dataStructure={dataStructure}
                sortStructure={SortStructure}
                MetaChange={MetaChange}
                AddOrRemoveHeader={AddOrRemoveHeader}
                AddOrRemoveField={AddOrRemoveField}
              />
            ) : (
              <StructureDataTypes
                dataStructure={dataStructure}
                manipulateFieldData={ManipulateFieldData}
              />
            )}
            <Loader
              className="loading-notification"
              inverted={DARK_MODE}
              active={showNotification}
            >
              Autosave...
            </Loader>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connector(StructureDetail);
