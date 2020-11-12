import React from 'react';
import { ActionCreator } from 'redux';
import { Segment, Header, List } from 'semantic-ui-react';
import { DARK_MODE, STRUCTURE_AUTOSAVE_FILE } from '../../utils/constants';
import { StructureActionTypes } from '../../redux/structure/action.types';

type StructureListProps = {
  activeFile: string;
  structuresPath: string;
  allStructures: Array<string>;
  changeStructure: ActionCreator<StructureActionTypes>;
};
class StructureList extends React.PureComponent<StructureListProps> {
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
          <List.Header className="uppercase">{fileName}</List.Header>
        </List.Content>
      </List.Item>
    ));
  }

  render() {
    const { activeFile, structuresPath, changeStructure } = this.props;
    return (
      <Segment inverted={DARK_MODE} basic clearing>
        <Header
          as="h3"
          className="muted-subheader"
          inverted={DARK_MODE}
          content="Structure List"
          subheader="Click to navigate"
          style={{
            marginTop: 1,
          }}
        />
        <List selection animated verticalAlign="middle" inverted={DARK_MODE}>
          <List.Item
            active={activeFile === STRUCTURE_AUTOSAVE_FILE.replace('.json', '')}
            key={STRUCTURE_AUTOSAVE_FILE}
            onClick={() => {
              changeStructure(structuresPath, STRUCTURE_AUTOSAVE_FILE);
            }}
          >
            <List.Content>
              <List.Header className="uppercase">New</List.Header>
            </List.Content>
          </List.Item>
          {this.renderStructureList()}
        </List>
      </Segment>
    );
  }
}

export default StructureList;
