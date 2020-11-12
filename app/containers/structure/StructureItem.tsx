import React from 'react';
import { ActionCreator } from 'redux';
import { Form, Loader, Header, Segment, Message, Button } from 'semantic-ui-react';
import { Preview, FieldForm, HeaderForm, SaveModal } from '../partials/structure';
import { NotificationManager } from '../../components/Notification';
import {
  DARK_MODE,
  AUTOSAVE_INTERVAL,
  NOTIFICATION_TIMEOUT,
  STRUCTURE_AUTOSAVE_NAME,
} from '../../utils/constants';
import { SettingPathInterface, StructureObject } from '../../types';
import { StructureActionTypes } from '../../redux/structure/action.types';
import { findObjectIndex } from '../../utils/functions';

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
  sortStructure: ActionCreator<StructureActionTypes>;
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
      const { errorState, activeFile, paths, dataStructure, SaveStructure } = this.props;
      if (errorState !== true && activeFile !== undefined) {
        this.setState({
          showNotification: true,
        });
        SaveStructure(
          paths.structures,
          dataStructure === undefined ? {} : dataStructure,
          activeFile,
          true
        );
      }
    }, AUTOSAVE_INTERVAL);
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

  getStructureHeaders = (): Array<string> => {
    const { dataStructure } = this.props;
    return dataStructure.map((structure) => structure.name);
  };

  getStructureFields = (whichHeader: string): Array<string> => {
    const { dataStructure } = this.props;
    const headerIndex = findObjectIndex(dataStructure, 'name', whichHeader);
    return dataStructure[headerIndex].items;
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
      ManipulateStructureField(selectedHeader, newField, 'add');
    }
  };

  onRemoveField = (removeField: string, whichHeader: string): void => {
    const { ManipulateStructureField } = this.props;

    const fields = this.getStructureFields(whichHeader);
    if (fields.includes(removeField)) {
      ManipulateStructureField(whichHeader, removeField, 'remove');
    }
  };

  render() {
    const {
      activeFile,
      dataStructure,
      paths,
      sortStructure,
      SaveStructure,
      errorState,
      errorMessage,
    } = this.props;
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
            content={
              activeFile === STRUCTURE_AUTOSAVE_NAME ? 'New Structure +' : activeFile
            }
            subheader={`${activeFile}.json`}
          />
          <Header inverted={DARK_MODE} as="h3" floated="left" style={{ marginLeft: 50 }}>
            {activeFile === STRUCTURE_AUTOSAVE_NAME ? (
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
            ) : (
              <Button
                size="tiny"
                color={DARK_MODE === true ? 'green' : undefined}
                inverted={DARK_MODE}
                onClick={() => {
                  SaveStructure(
                    paths.structures,
                    dataStructure === undefined ? {} : dataStructure,
                    activeFile,
                    true
                  );

                  NotificationManager.notificate({
                    type: 'success',
                    title: 'Structure',
                    message: 'Save is successfull.',
                    timeOut: NOTIFICATION_TIMEOUT,
                  });
                }}
              >
                SAVE
              </Button>
            )}
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
          onSort={sortStructure}
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
