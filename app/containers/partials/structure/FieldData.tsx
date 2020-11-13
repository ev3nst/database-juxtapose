import React from 'react';
import { Card, Header, Checkbox, Form } from 'semantic-ui-react';
import { StructureFieldType, StructureFieldDataTypes } from '../../../types';
import { DARK_MODE, FIELD_COLORS } from '../../../utils/constants';

type FieldDataProps = {
  field: StructureFieldType;
};

type FieldDataStates = {
  dataType: StructureFieldDataTypes;
  required: boolean;
  defaultValue: any;
};

class FieldData extends React.Component<FieldDataProps, FieldDataStates> {
  constructor(props: FieldDataProps) {
    super(props);

    this.state = {
      dataType: props.field.dataType,
      required: props.field.required,
      defaultValue: props.field.defaultValue !== null ? props.field.defaultValue : '',
    };
  }

  shouldComponentUpdate(nextProps: FieldDataProps, prevStates: FieldDataStates) {
    const { dataType, required, defaultValue } = this.state;
    const { field } = this.props;

    if (
      prevStates.dataType !== dataType ||
      prevStates.required !== required ||
      prevStates.defaultValue !== defaultValue ||
      nextProps.field !== field
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { dataType, required, defaultValue } = this.state;
    const { field } = this.props;
    return (
      <Card
        className={DARK_MODE === true ? 'inverted' : undefined}
        style={{ padding: 15 }}
      >
        <Form.Group>
          <Header as="h5" content={field.name.toUpperCase()} inverted={DARK_MODE} />
          <Form.Input
            fluid
            list="datatypes"
            inverted={DARK_MODE}
            transparent={DARK_MODE}
            value={dataType}
            style={{ marginBottom: 10, color: FIELD_COLORS[dataType] }}
            onChange={(event) => {
              const value = event.target.value as StructureFieldDataTypes;
              this.setState({ dataType: value });
            }}
          />
          <Checkbox
            className={DARK_MODE === true ? 'inverted' : undefined}
            label="Required"
            style={{ marginBottom: 10 }}
            checked={required}
            onChange={() => this.setState({ required: !required })}
          />
          <Form.Input
            placeholder="Specify default value.."
            fluid
            inverted={DARK_MODE}
            transparent={DARK_MODE}
            value={defaultValue}
            onChange={(event) => this.setState({ defaultValue: event.target.value })}
          />
        </Form.Group>
      </Card>
    );
  }
}

export default FieldData;
