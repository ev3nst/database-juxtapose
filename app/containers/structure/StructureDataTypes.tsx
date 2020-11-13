import React from 'react';
import { Card, Tab, Header, Input, Form } from 'semantic-ui-react';
import { StructureObject, StructureFieldType } from '../../types';
import { DARK_MODE, COLORS } from '../../utils/constants';

const FieldItem = ({ field }: { field: StructureFieldType }) => (
  <Card
    className={DARK_MODE === true ? 'inverted' : undefined}
    style={{
      padding: 15,
      // paddingLeft: 20,
      // paddingRight: 20,
    }}
  >
    <Form.Group>
      <Header as="h5" content={field.name} />
      <Form.Input
        fluid
        // label="Data Type"
        list="datatypes"
        placeholder="Choose Data Type..."
        inverted={DARK_MODE}
        transparent={DARK_MODE}
      />
      <datalist id="datatypes">
        <option value="String" selected={true}>
          String
        </option>
        <option value="Integer">Integer</option>
        <option value="Boolean">Boolean</option>
      </datalist>
      <Form.Input fluid inverted={DARK_MODE} transparent={DARK_MODE} />
    </Form.Group>
  </Card>
);

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
            renderActiveOnly
            style={PaneReset}
          >
            <Card.Group itemsPerRow={4}>
              {dataStructure[i].items.map((field) => (
                <FieldItem key={field.name} field={field} />
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
    return (
      <div>
        <Tab menu={{ secondary: true, inverted: true }} panes={this.resolvePanes()} />
      </div>
    );
  }
}

export default StructureDataTypes;
