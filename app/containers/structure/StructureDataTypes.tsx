import React from 'react';
import { Segment, Message, Card, Tab, List } from 'semantic-ui-react';
import { FieldData } from '../partials/structure';
import { StructureObject } from '../../types';
import {
  DARK_MODE,
  FIELD_COLORS,
  VerticalPaddingReset,
  HorizontalPaddingReset,
} from '../../utils/constants';

const PaneReset: React.CSSProperties = {
  paddingTop: 12,
  paddingLeft: 5,
  borderWidth: 0,
};

type PaneItem = {
  menuItem?: any;
  render?: (() => React.ReactNode) | undefined;
};

type StructureDataTypesProps = {
  dataStructure: StructureObject;
};

class StructureDataTypes extends React.PureComponent<StructureDataTypesProps> {
  resolvePanes() {
    const { dataStructure } = this.props;
    const tabs: PaneItem[] = [];

    for (let i = 0; i < dataStructure.length; i += 1) {
      const newTab = {
        menuItem: dataStructure[i].name,
        render: () => (
          <Tab.Pane
            key={dataStructure[i].name}
            inverted={DARK_MODE}
            attached="top"
            style={PaneReset}
          >
            <Card.Group itemsPerRow={3} className="field-data-card-group">
              <Segment
                basic
                className="data-types"
                clearing
                inverted={DARK_MODE}
                style={VerticalPaddingReset}
              >
                Data Types:
                <List
                  selection
                  horizontal
                  inverted={DARK_MODE}
                  style={{ marginLeft: 15 }}
                >
                  <List.Item style={{ color: FIELD_COLORS.Any }}>Any</List.Item>
                  <List.Item style={{ color: FIELD_COLORS.String }}>String</List.Item>
                  <List.Item style={{ color: FIELD_COLORS.Integer }}>Integer</List.Item>
                  <List.Item style={{ color: FIELD_COLORS.Double }}>Double</List.Item>
                  <List.Item style={{ color: FIELD_COLORS.Boolean }}>Boolean</List.Item>
                  <List.Item style={{ color: FIELD_COLORS.Date }}>Date</List.Item>
                  <List.Item style={{ color: FIELD_COLORS.Timestamp }}>
                    Timestamp
                  </List.Item>
                  <List.Item style={{ color: FIELD_COLORS.Json }}>Json</List.Item>
                  <List.Item style={{ color: FIELD_COLORS.Enum }}>Enum</List.Item>
                  <List.Item style={{ color: FIELD_COLORS.Array }}>Array</List.Item>
                </List>
                <Message
                  size="small"
                  style={DARK_MODE === true ? HorizontalPaddingReset : undefined}
                  color={DARK_MODE === true ? 'black' : 'teal'}
                  header="Optional"
                  list={[
                    'These types are used when database is linked to this structure to check if integrated database has correct value types that is specified here. This is especially usefull if database is relational for example MySQL. Default value is Any, which means there will be no type checking.',
                  ]}
                />
              </Segment>

              {dataStructure[i].items.map((field) => (
                <FieldData key={field.name} field={field} />
              ))}
            </Card.Group>
          </Tab.Pane>
        ),
      };

      tabs.push(newTab);
    }

    return tabs;
  }

  render() {
    const { dataStructure } = this.props;
    return (
      <div>
        {dataStructure.length > 0 && (
          <>
            <Tab
              menu={{ secondary: DARK_MODE, inverted: DARK_MODE }}
              panes={this.resolvePanes()}
            />
            <datalist id="datatypes" defaultValue="Any">
              <option value="Any">Any</option>
              <option value="String">String</option>
              <option value="Integer">Integer</option>
              <option value="Double">Double</option>
              <option value="Boolean">Boolean</option>
              <option value="Date">Date</option>
              <option value="Timestamp">Timestamp</option>
              <option value="Json">Json</option>
              <option value="Enum">Enum</option>
              <option value="Array">Array</option>
            </datalist>
          </>
        )}
      </div>
    );
  }
}

export default StructureDataTypes;
