import React from 'react';
import { Segment, Header, List, Confirm, Icon } from 'semantic-ui-react';
import {
  DARK_MODE,
  STRUCTURE_AUTOSAVE_NAME,
  STRUCTURE_AUTOSAVE_FILE,
} from '../../utils/constants';
import { StructureListProps, StructureListStates } from './types';

const LessSegmentPadding: React.CSSProperties = {
  paddingLeft: 6,
  paddingRight: 2,
};

const ListItemMargin: React.CSSProperties = {
  marginBottom: 7,
};

class StructureList extends React.Component<StructureListProps, StructureListStates> {
  constructor(props: StructureListProps) {
    super(props);

    this.state = {
      deleteStructureConfirm: false,
      whichStructure: '',
    };
  }

  shouldComponentUpdate(
    nextProps: StructureListProps,
    prevStates: StructureListStates
  ): boolean {
    const { allStructures, activeFile } = this.props;
    const { deleteStructureConfirm } = this.state;
    if (
      nextProps.allStructures.length !== allStructures.length ||
      nextProps.activeFile !== activeFile ||
      prevStates.deleteStructureConfirm !== deleteStructureConfirm
    ) {
      return true;
    }

    return false;
  }

  renderStructureList(): JSX.Element[] {
    const { activeFile, structuresPath, allStructures, changeStructure } = this.props;
    return allStructures.map((fileName) => (
      <List.Item
        active={activeFile === fileName}
        key={fileName}
        onClick={() => {
          changeStructure(structuresPath, `${fileName}.json`);
        }}
      >
        <List.Content>
          <List.Header>
            <Icon size="small" name="file alternate outline" /> {fileName}
          </List.Header>
        </List.Content>
        <Icon
          style={{ float: 'right', marginTop: 4 }}
          size="small"
          color="red"
          name="trash alternate outline"
          onClick={() => {
            this.setState({ deleteStructureConfirm: true, whichStructure: fileName });
          }}
        />
      </List.Item>
    ));
  }

  render() {
    const { activeFile, structuresPath, changeStructure, deleteStructure } = this.props;
    const { deleteStructureConfirm, whichStructure } = this.state;
    return (
      <Segment inverted={DARK_MODE} basic clearing style={LessSegmentPadding}>
        <Header
          as="h3"
          className="muted-subheader"
          inverted={DARK_MODE}
          content="Structure List"
          subheader="Click to navigate"
          style={{ marginTop: 1 }}
        />
        <List selection animated verticalAlign="middle" inverted={DARK_MODE}>
          <List.Item
            key={STRUCTURE_AUTOSAVE_FILE}
            active={activeFile === STRUCTURE_AUTOSAVE_NAME}
            style={ListItemMargin}
            onClick={() => {
              changeStructure(structuresPath, STRUCTURE_AUTOSAVE_FILE);
            }}
          >
            <List.Content>
              <List.Header>
                New <Icon size="small" name="plus" />
              </List.Header>
            </List.Content>
          </List.Item>
          {this.renderStructureList()}
        </List>

        <Confirm
          centered
          dimmer={DARK_MODE === true ? undefined : 'inverted'}
          open={deleteStructureConfirm}
          header="Delete Structure"
          content="This action will delete structure file."
          onCancel={() =>
            this.setState({ deleteStructureConfirm: false, whichStructure: '' })
          }
          onConfirm={() => {
            deleteStructure(structuresPath, whichStructure);
            if (activeFile === whichStructure) {
              changeStructure(structuresPath, STRUCTURE_AUTOSAVE_FILE);
            }
            this.setState({ deleteStructureConfirm: false, whichStructure: '' });
          }}
        />
      </Segment>
    );
  }
}

export default StructureList;
