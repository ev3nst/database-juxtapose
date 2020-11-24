import React from 'react';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';
import SaveModal from '../SaveModal';
import NotificationManager from '../Notification';
import { DARK_MODE, NOTIFICATION_TIMEOUT } from '../../utils/constants';
import { FormFileSegmentProps } from './types';

const resetPadding: React.CSSProperties = {
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
};

class FormFileSegment extends React.PureComponent<FormFileSegmentProps> {
  render() {
    const {
      title,
      savePath,
      defaultFileName,
      emptyData,
      activeFile,
      dataToSave,
      SaveFile,
      onGoBack,
      extraButtons,
    } = this.props;
    return (
      <Segment inverted={DARK_MODE} style={resetPadding} basic clearing>
        <Header
          as="h3"
          className="muted-subheader"
          inverted={DARK_MODE}
          floated="left"
          content={
            activeFile === defaultFileName ? `New ${title} +` : activeFile.toUpperCase()
          }
          subheader={`${activeFile}.json`}
        />
        <Header inverted={DARK_MODE} as="h3" floated="left" style={{ marginLeft: 50 }}>
          {activeFile === defaultFileName ? (
            <SaveModal
              inverted={DARK_MODE}
              pathPrefix={savePath}
              label={title}
              onConfirm={(fileName) => {
                SaveFile(
                  savePath,
                  dataToSave === undefined ? emptyData : dataToSave,
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
                SaveFile(
                  savePath,
                  dataToSave === undefined ? emptyData : dataToSave,
                  activeFile,
                  true
                );

                NotificationManager.notificate({
                  type: 'success',
                  title,
                  message: 'Save is successfull.',
                  timeOut: NOTIFICATION_TIMEOUT,
                });
              }}
            >
              SAVE
            </Button>
          )}
        </Header>
        {extraButtons}
        <Button
          icon
          color="red"
          size="tiny"
          inverted={DARK_MODE}
          floated="right"
          onClick={() => onGoBack()}
        >
          Go Back
          <Icon name="arrow right" />
        </Button>
      </Segment>
    );
  }
}

export default FormFileSegment;
