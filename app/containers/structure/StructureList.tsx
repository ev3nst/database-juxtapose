import React from 'react';
import { ActionCreator } from 'redux';
import { Segment, Header, List } from 'semantic-ui-react';
import { DARK_MODE } from '../../utils/constants';
import { StructureActionTypes } from '../../redux/structure/action.types';

type StructureListProps = {
  structuresPath: string;
  allStructures: Array<string>;
  changeStructure: ActionCreator<StructureActionTypes>;
};
class StructureList extends React.PureComponent<StructureListProps> {
  renderStructureList(): JSX.Element[] {
    const { structuresPath, allStructures, changeStructure } = this.props;
    return allStructures.map((fileName) => (
      <List.Item
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
          {this.renderStructureList()}
        </List>
      </Segment>
    );
  }
}

export default StructureList;
