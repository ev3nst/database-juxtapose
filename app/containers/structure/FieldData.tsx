import React from 'react';
import { Card, Header, Checkbox, Form } from 'semantic-ui-react';
import { DARK_MODE, FIELD_COLORS } from '../../utils/constants';
import { StructureFieldDataTypes } from '../../types';
import { FieldDataProps } from './types';

const ExtraPadding: React.CSSProperties = {
  padding: 15,
};

const FieldData = ({ header, field, manipulateFieldData }: FieldDataProps) => {
  return (
    <Card className={DARK_MODE === true ? 'inverted' : undefined} style={ExtraPadding}>
      <Form.Group>
        <Header as="h5" content={field.fieldName.toUpperCase()} inverted={DARK_MODE} />
        <Form.Input
          fluid
          list="datatypes"
          inverted={DARK_MODE}
          transparent={DARK_MODE}
          value={field.dataType}
          style={{ marginBottom: 10, color: FIELD_COLORS[field.dataType] }}
          onChange={(event) => {
            const value = event.target.value as StructureFieldDataTypes;
            manipulateFieldData(header, field.fieldName, 'dataType', value);
          }}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
            if (Object.keys(FIELD_COLORS).indexOf(event.target.value) === -1) {
              manipulateFieldData(header, field.fieldName, 'dataType', 'Any');
            }
          }}
        />
        <Checkbox
          className={DARK_MODE === true ? 'inverted' : undefined}
          label="Required"
          style={{ marginBottom: 10 }}
          checked={field.required}
          onChange={() => {
            manipulateFieldData(header, field.fieldName, 'required', !field.required);
          }}
        />
        <Form.Input
          placeholder="Specify default value.."
          fluid
          inverted={DARK_MODE}
          transparent={DARK_MODE}
          value={field.defaultValue !== null ? field.defaultValue : ''}
          onChange={(event) => {
            manipulateFieldData(
              header,
              field.fieldName,
              'defaultValue',
              event.target.value
            );
          }}
        />
      </Form.Group>
    </Card>
  );
};

export default FieldData;
