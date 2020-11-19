import React from 'react';
import { ActionCreator } from 'redux';
import { Loader, Header, Segment, Message, Button } from 'semantic-ui-react';
import { NotificationManager, SaveModal } from '../../components';
import {
  DARK_MODE,
  AUTOSAVE_INTERVAL,
  NOTIFICATION_TIMEOUT,
  INTEGRATION_AUTOSAVE_NAME,
} from '../../utils/constants';
import { SettingPathInterface, IntegrationObject } from '../../types';
import { IntegrationActionTypes } from '../../redux/integration/action.types';

const resetPadding: React.CSSProperties = {
  paddingLeft: 0,
  paddingRight: 0,
};

type IntegrationItemProps = {
  activeFile: string;
  errorState: boolean;
  errorMessage: string;
  paths: SettingPathInterface;
  autosaveLoading: boolean;
  dataIntegration: IntegrationObject;
  SaveIntegration: ActionCreator<IntegrationActionTypes>;
};

type IntegrationItemStates = {
  showNotification: boolean;
};

class IntegrationItem extends React.PureComponent<
  IntegrationItemProps,
  IntegrationItemStates
> {
  autosaveID!: NodeJS.Timeout;

  notificationID!: NodeJS.Timeout;

  constructor(props: IntegrationItemProps) {
    super(props);

    this.state = {
      showNotification: false,
    };
  }

  componentDidMount() {
    this.autosaveID = setInterval(() => {
      const {
        errorState,
        activeFile,
        paths,
        dataIntegration,
        SaveIntegration,
      } = this.props;
      if (errorState !== true && activeFile !== undefined) {
        this.setState({
          showNotification: true,
        });
        SaveIntegration(
          paths.integrations,
          dataIntegration === undefined ? [] : dataIntegration,
          activeFile,
          true
        );
      }
    }, AUTOSAVE_INTERVAL);
  }

  componentDidUpdate(nextProps: IntegrationItemProps) {
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
      activeFile,
      dataIntegration,
      paths,
      SaveIntegration,
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
              activeFile === INTEGRATION_AUTOSAVE_NAME ? 'New Integration +' : activeFile
            }
            subheader={`${activeFile}.json`}
          />
          <Header inverted={DARK_MODE} as="h3" floated="left" style={{ marginLeft: 50 }}>
            {activeFile === INTEGRATION_AUTOSAVE_NAME ? (
              <SaveModal
                inverted={DARK_MODE}
                pathPrefix={paths.integrations}
                label="Integration"
                onConfirm={(fileName) => {
                  SaveIntegration(
                    paths.integrations,
                    dataIntegration === undefined ? {} : dataIntegration,
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
                  SaveIntegration(
                    paths.integrations,
                    dataIntegration === undefined ? {} : dataIntegration,
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

export default IntegrationItem;
