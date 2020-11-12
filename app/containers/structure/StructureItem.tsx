import React from 'react';
import { ActionCreator } from 'redux';
import { Form, Loader, Header, Segment, Message } from 'semantic-ui-react';
import { Preview, FieldForm, HeaderForm, SaveModal } from '../partials/structure';
import {
  INTERVAL_TIMEOUT,
  DARK_MODE,
  STRUCTURE_AUTOSAVE_FILE,
} from '../../utils/constants';
import { SettingPathInterface, StructureObject } from '../../types';
import { StructureActionTypes } from '../../redux/structure/action.types';

const resetPadding: React.CSSProperties = {
  paddingLeft: 0,
  paddingRight: 0,
};

type StructureItemProps = {
  activeFile: string;
  errorState: boolean;
  errorMessage: string;
  paths: SettingPathInterface;
  autosaveLoading: boolean;
  dataStructure: StructureObject;
  SaveStructure: ActionCreator<StructureActionTypes>;
  ManipulateStructureHeader: ActionCreator<StructureActionTypes>;
  ManipulateStructureField: ActionCreator<StructureActionTypes>;
};

type StructureItemStates = {
  showNotification: boolean;
};

class StructureItem extends React.PureComponent<StructureItemProps, StructureItemStates> {
  autosaveID!: NodeJS.Timeout;

  notificationID!: NodeJS.Timeout;

  constructor(props: StructureItemProps) {
    super(props);

    this.state = {
      showNotification: false,
    };
  }

  componentDidMount() {
    this.autosaveID = setInterval(() => {
      const { errorState, activeFile } = this.props;
      if (errorState !== true && activeFile !== undefined) {
        this.onSaveStructure(activeFile);
      }
    }, INTERVAL_TIMEOUT);
  }

  componentDidUpdate(nextProps: StructureItemProps) {
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

  onSaveStructure(fileName: string) {
    const { paths, dataStructure, SaveStructure } = this.props;
    this.setState({
      showNotification: true,
    });
    SaveStructure(
      paths.structures,
      dataStructure === undefined ? {} : dataStructure,
      fileName,
      true
    );
  }

  getStructureHeaders = (): Array<string> => {
    const { dataStructure } = this.props;
    return Object.keys(dataStructure);
  };

  getStructureFields = (whichHeader: string): Array<string> => {
    const { dataStructure } = this.props;
    return Object.values(dataStructure[whichHeader]);
  };

  onNewHeader = (newHeader: string): void => {
    const { ManipulateStructureHeader } = this.props;

    const headers = this.getStructureHeaders();
    if (!headers.includes(newHeader)) {
      ManipulateStructureHeader(newHeader, 'add');
    }
  };

  onRemoveHeader = (removeHeader: string): void => {
    const { ManipulateStructureHeader } = this.props;

    const headers = this.getStructureHeaders();
    if (headers.includes(removeHeader)) {
      ManipulateStructureHeader(removeHeader, 'remove');
    }
  };

  onNewField = (newField: string, selectedHeader: string): void => {
    const { ManipulateStructureField } = this.props;

    const fields = this.getStructureFields(selectedHeader);
    if (!fields.includes(newField)) {
      ManipulateStructureField(newField, selectedHeader, 'add');
    }
  };

  onRemoveField = (removeField: string, whichHeader: string): void => {
    const { ManipulateStructureField } = this.props;

    const fields = this.getStructureFields(whichHeader);
    if (fields.includes(removeField)) {
      ManipulateStructureField(removeField, whichHeader, 'remove');
    }
  };

  render() {
    const { dataStructure, paths, SaveStructure, errorState, errorMessage } = this.props;
    const { showNotification } = this.state;

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
      <>
        <Segment inverted={DARK_MODE} style={resetPadding} basic clearing>
          <Header
            as="h3"
            className="muted-subheader"
            inverted={DARK_MODE}
            floated="left"
            content="New Structure"
            subheader={STRUCTURE_AUTOSAVE_FILE}
          />
          <Header inverted={DARK_MODE} as="h3" floated="right">
            <SaveModal
              inverted={DARK_MODE}
              pathPrefix={paths.structures}
              onConfirm={(fileName) => {
                SaveStructure(
                  paths.structures,
                  dataStructure === undefined ? {} : dataStructure,
                  fileName,
                  false
                );
              }}
            />
          </Header>
        </Segment>

        <Form inverted={DARK_MODE}>
          <Form.Group widths="equal">
            <HeaderForm onNewHeader={this.onNewHeader} />
            <FieldForm
              onNewField={this.onNewField}
              structureHeaders={this.getStructureHeaders()}
            />
          </Form.Group>
        </Form>

        <Preview
          inverted={DARK_MODE}
          onRemoveHeader={this.onRemoveHeader}
          onRemoveField={this.onRemoveField}
          dataStructure={dataStructure}
        />
        <Loader
          className="loading-notification"
          inverted={DARK_MODE}
          active={showNotification}
        >
          Autosave...
        </Loader>
      </>
    );
  }
}

export default StructureItem;
