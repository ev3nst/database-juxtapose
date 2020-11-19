import React from 'react';
import { Message, Button, Icon, Loader } from 'semantic-ui-react';
import SFileSegment from './partials/SFileSegment';
import StructureItem from './StructureItem';
import StructureDataTypes from './StructureDataTypes';
import { DARK_MODE, AUTOSAVE_INTERVAL, EMPTY_STRUCTURE } from '../../utils/constants';
import { StructureDetailProps, StructureDetailStates } from './types';

const itemSpace: React.CSSProperties = {
  marginLeft: 10,
  paddingRight: 10,
};

const SwitchButtonStyles: React.CSSProperties = {
  zIndex: 9,
  marginTop: 12,
};

class StructureDetail extends React.PureComponent<
  StructureDetailProps,
  StructureDetailStates
> {
  autosaveID!: NodeJS.Timeout;

  notificationID!: NodeJS.Timeout;

  constructor(props: StructureDetailProps) {
    super(props);

    this.state = {
      showDataTypes: false,
      showNotification: false,
    };
  }

  componentDidMount() {
    this.autosaveID = setInterval(() => {
      const { errorState, activeFile, paths, dataStructure, SaveStructure } = this.props;
      if (errorState !== true && activeFile !== undefined) {
        this.setState({
          showNotification: true,
        });
        SaveStructure(
          paths.structures,
          dataStructure === undefined ? EMPTY_STRUCTURE : dataStructure,
          activeFile,
          true
        );
      }
    }, AUTOSAVE_INTERVAL);
  }

  componentDidUpdate(nextProps: StructureDetailProps) {
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

  render() {
    const {
      paths,
      activeFile,
      dataStructure,
      SaveStructure,
      SortStructure,
      AddOrRemoveHeader,
      AddOrRemoveField,
      ManipulateFieldData,
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
      <div style={itemSpace}>
        <Button
          style={SwitchButtonStyles}
          floated="right"
          icon
          labelPosition="right"
          color="teal"
          inverted={DARK_MODE}
          onClick={() => this.setState({ showDataTypes: !showDataTypes })}
        >
          Switch to {showDataTypes === false ? 'Data Types' : 'Structure'}
          <Icon name="arrow right" />
        </Button>
        <SFileSegment
          paths={paths}
          activeFile={activeFile}
          dataStructure={dataStructure}
          SaveStructure={SaveStructure}
        />
        {showDataTypes === false ? (
          <StructureItem
            dataStructure={dataStructure}
            sortStructure={SortStructure}
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
      </div>
    );
  }
}

export default StructureDetail;
