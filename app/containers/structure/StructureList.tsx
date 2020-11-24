import React from 'react';
import { Segment, Header, List, Confirm, Icon } from 'semantic-ui-react';
import { DARK_MODE, STRUCTURE_AUTOSAVE_FILE } from '../../utils/constants';
import { StructureListProps, StructureListStates } from './types';

const LessSegmentPadding: React.CSSProperties = {
  paddingLeft: 6,
  paddingRight: 2,
};

const ListItemPadding: React.CSSProperties = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 10,
  marginRight: 20,
};

const DeleteButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: 10,
  right: 0,
  zIndex: 9,
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
    const { allStructures } = this.props;
    const { deleteStructureConfirm } = this.state;
    if (
      nextProps.allStructures.length !== allStructures.length ||
      prevStates.deleteStructureConfirm !== deleteStructureConfirm
    ) {
      return true;
    }

    return false;
  }

  renderStructureList(): JSX.Element[] {
    const {
      structureFile,
      structuresPath,
      allStructures,
      changeStructure,
      onNavigate,
    } = this.props;
    return allStructures.map((fileName) => (
      <List.Item
        active={structureFile === fileName}
        key={fileName}
        style={ListItemPadding}
      >
        <List.Content
          onClick={() => {
            changeStructure(structuresPath, `${fileName}.json`);
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
            this.setState({ deleteStructureConfirm: true, whichStructure: fileName });
          }}
        />
      </List.Item>
    ));
  }

  render() {
    const {
      structureFile,
      structuresPath,
      changeStructure,
      deleteStructure,
      onNavigate,
    } = this.props;
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
        <List divided selection relaxed inverted={DARK_MODE}>
          <List.Item key={STRUCTURE_AUTOSAVE_FILE} active={false} style={ListItemPadding}>
            <List.Content
              onClick={() => {
                changeStructure(structuresPath, STRUCTURE_AUTOSAVE_FILE);
                onNavigate();
              }}
            >
              <List.Header>
                New <Icon size="small" name="plus" />
              </List.Header>
              Autosave file.
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
            if (structureFile === whichStructure) {
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
