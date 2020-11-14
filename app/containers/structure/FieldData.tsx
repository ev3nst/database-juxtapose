import React from 'react';
import { ActionCreator } from 'redux';
import { Card, Header, Checkbox, Form } from 'semantic-ui-react';
import { StructureFieldType, StructureFieldDataTypes } from '../../types';
import { DARK_MODE, FIELD_COLORS } from '../../utils/constants';
import { StructureActionTypes } from '../../redux/structure/action.types';

const ExtraPadding: React.CSSProperties = {
  padding: 15,
};

type FieldDataProps = {
  header: string;
  field: StructureFieldType;
  manipulateFieldData: ActionCreator<StructureActionTypes>;
};

const FieldData = ({ header, field, manipulateFieldData }: FieldDataProps) => {
  return (
    <Card className={DARK_MODE === true ? 'inverted' : undefined} style={ExtraPadding}>
      <Form.Group>
        <Header as="h5" content={field.name.toUpperCase()} inverted={DARK_MODE} />
        <Form.Input
          fluid
          list="datatypes"
          inverted={DARK_MODE}
          transparent={DARK_MODE}
          value={field.dataType}
          style={{ marginBottom: 10, color: FIELD_COLORS[field.dataType] }}
          onChange={(event) => {
            const value = event.target.value as StructureFieldDataTypes;
            manipulateFieldData(header, field.name, 'dataType', value);
          }}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
            if (Object.keys(FIELD_COLORS).indexOf(event.target.value) === -1) {
              manipulateFieldData(header, field.name, 'dataType', 'Any');
            }
          }}
        />
        <Checkbox
          className={DARK_MODE === true ? 'inverted' : undefined}
          label="Required"
          style={{ marginBottom: 10 }}
          checked={field.required}
          onChange={() => {
            manipulateFieldData(header, field.name, 'required', !field.required);
          }}
        />
        <Form.Input
          placeholder="Specify default value.."
          fluid
          inverted={DARK_MODE}
          transparent={DARK_MODE}
          value={field.defaultValue !== null ? field.defaultValue : ''}
          onChange={(event) => {
            manipulateFieldData(header, field.name, 'defaultValue', event.target.value);
          }}
        />
      </Form.Group>
    </Card>
  );
};

export default FieldData;
