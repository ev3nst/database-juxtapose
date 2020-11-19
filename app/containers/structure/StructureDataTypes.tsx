import React from 'react';
import { Segment, Message, Card, Tab, List } from 'semantic-ui-react';
import FieldData from './FieldData';
import {
  DARK_MODE,
  FIELD_COLORS,
  VerticalPaddingReset,
  HorizontalPaddingReset,
} from '../../utils/constants';
import { PaneItem, StructureDataTypesProps } from './types';

const PaneReset: React.CSSProperties = {
  paddingTop: 12,
  paddingLeft: 5,
  borderWidth: 0,
};

class StructureDataTypes extends React.PureComponent<StructureDataTypesProps> {
  resolvePanes() {
    const { dataStructure, manipulateFieldData } = this.props;
    const tabs: PaneItem[] = [];

    for (let i = 0; i < dataStructure.structure.length; i += 1) {
      const newTab = {
        menuItem: dataStructure.structure[i].itemName,
        render: () => (
          <Tab.Pane
            key={dataStructure.structure[i].itemName}
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
                  {Object.keys(FIELD_COLORS).map((field) => (
                    <List.Item
                      key={field}
                      className={
                        DARK_MODE === true
                          ? 'inverted-text-shadow'
                          : 'defualt-text-shadow'
                      }
                      style={{ color: FIELD_COLORS[field as keyof typeof FIELD_COLORS] }}
                    >
                      {field}
                    </List.Item>
                  ))}
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

              {dataStructure.structure[i].items.map((field) => (
                <FieldData
                  key={field.fieldName}
                  header={dataStructure.structure[i].itemName}
                  field={field}
                  manipulateFieldData={manipulateFieldData}
                />
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
        {dataStructure.structure.length > 0 && (
          <>
            <Tab
              menu={{ secondary: DARK_MODE, inverted: DARK_MODE }}
              panes={this.resolvePanes()}
            />
            <datalist id="datatypes" defaultValue="Any">
              {Object.keys(FIELD_COLORS).map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </datalist>
          </>
        )}
      </div>
    );
  }
}

export default StructureDataTypes;
