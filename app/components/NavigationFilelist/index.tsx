import React from 'react';
import { Segment, Header, List, Confirm, Icon } from 'semantic-ui-react';
import { DARK_MODE } from '../../utils/constants';
import { LessSegmentPadding, ListItemPadding, DeleteButtonStyle } from './styles';
import { FileListProps, FileListStates } from './types';

class NavigationFilelist extends React.Component<FileListProps, FileListStates> {
  constructor(props: FileListProps) {
    super(props);

    this.state = {
      deleteFileConfirm: false,
      whichFile: '',
    };
  }

  shouldComponentUpdate(nextProps: FileListProps, prevStates: FileListStates): boolean {
    const { allFiles } = this.props;
    const { deleteFileConfirm } = this.state;
    if (
      nextProps.allFiles.length !== allFiles.length ||
      prevStates.deleteFileConfirm !== deleteFileConfirm
    ) {
      return true;
    }

    return false;
  }

  renderFileList(): JSX.Element[] {
    const { activeFile, filesPath, allFiles, changeFile, onNavigate } = this.props;
    return allFiles.map((fileName) => (
      <List.Item active={activeFile === fileName} key={fileName} style={ListItemPadding}>
        <List.Content
          onClick={() => {
            changeFile(filesPath, `${fileName}.json`);
            onNavigate();
          }}
        >
          <List.Header>
            <Icon size="small" name="file alternate outline" /> {fileName}
          </List.Header>
        </List.Content>
        <Icon
          style={DeleteButtonStyle}
          color="red"
          name="trash alternate outline"
          onClick={() => {
            this.setState({ deleteFileConfirm: true, whichFile: fileName });
          }}
        />
      </List.Item>
    ));
  }

  render() {
    const {
      activeFile,
      filesPath,
      changeFile,
      deleteFile,
      onNavigate,
      newFile,
      title,
    } = this.props;
    const { deleteFileConfirm, whichFile } = this.state;
    return (
      <Segment inverted={DARK_MODE} basic clearing style={LessSegmentPadding}>
        <Header
          as="h3"
          className="muted-subheader"
          inverted={DARK_MODE}
          content={title}
          subheader="Click to navigate"
          style={{ marginTop: 1 }}
        />
        <List divided relaxed inverted={DARK_MODE}>
          <List.Item key={newFile} active={false} style={ListItemPadding}>
            <List.Content
              onClick={() => {
                changeFile(filesPath, newFile);
                onNavigate();
              }}
            >
              <List.Header>
                <Icon size="small" name="plus" />
                Create New
              </List.Header>
            </List.Content>
          </List.Item>
          {this.renderFileList()}
        </List>
        <Confirm
          centered
          dimmer={DARK_MODE === true ? undefined : 'inverted'}
          open={deleteFileConfirm}
          header="Delete File"
          content="This action will delete file file."
          onCancel={() => this.setState({ deleteFileConfirm: false, whichFile: '' })}
          onConfirm={() => {
            deleteFile(filesPath, whichFile);
            if (activeFile === whichFile) {
              changeFile(filesPath, newFile);
            }
            this.setState({ deleteFileConfirm: false, whichFile: '' });
          }}
        />
      </Segment>
    );
  }
}

export default NavigationFilelist;
