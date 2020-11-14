import React from 'react';
import { ActionCreator } from 'redux';
import { Segment, Header, Button } from 'semantic-ui-react';
import { SaveModal, NotificationManager } from '../../components';
import {
  DARK_MODE,
  STRUCTURE_AUTOSAVE_NAME,
  NOTIFICATION_TIMEOUT,
} from '../../utils/constants';
import { SettingPathInterface, StructureObject } from '../../types';
import { StructureActionTypes } from '../../redux/structure/action.types';

const resetPadding: React.CSSProperties = {
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
};

type SFileSegmentProps = {
  paths: SettingPathInterface;
  activeFile: string;
  dataStructure: StructureObject;
  SaveStructure: ActionCreator<StructureActionTypes>;
};
class SFileSegment extends React.PureComponent<SFileSegmentProps> {
  render() {
    const { paths, activeFile, dataStructure, SaveStructure } = this.props;
    return (
      <Segment inverted={DARK_MODE} style={resetPadding} basic clearing>
        <Header
          as="h3"
          className="muted-subheader"
          inverted={DARK_MODE}
          floated="left"
          content={
            activeFile === STRUCTURE_AUTOSAVE_NAME
              ? 'New Structure +'
              : activeFile.toUpperCase()
          }
          subheader={`${activeFile}.json`}
        />
        <Header inverted={DARK_MODE} as="h3" floated="left" style={{ marginLeft: 50 }}>
          {activeFile === STRUCTURE_AUTOSAVE_NAME ? (
            <SaveModal
              inverted={DARK_MODE}
              pathPrefix={paths.structures}
              label="Structure"
              onConfirm={(fileName) => {
                SaveStructure(
                  paths.structures,
                  dataStructure === undefined ? [] : dataStructure,
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
                  dataStructure === undefined ? [] : dataStructure,
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
    );
  }
}

export default SFileSegment;
