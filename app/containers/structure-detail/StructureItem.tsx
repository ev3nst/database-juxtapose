import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import Preview from './partials/Preview';
import FieldInput from './partials/inputs/FieldInput';
import HeaderInput from './partials/inputs/HeaderInput';
import DescriptionInput from './partials/inputs/DescriptionInput';
import { findObjectIndex } from '../../utils/functions';
import { DARK_MODE } from '../../utils/constants';
import { StructureItemProps } from './types';

class StructureItem extends React.PureComponent<StructureItemProps> {
  getStructureHeaders = (): Array<string> => {
    const { dataStructure } = this.props;
    return dataStructure.structure.map((structure) => structure.itemName);
  };

  getStructureFields = (whichHeader: string): Array<string> => {
    const { dataStructure } = this.props;
    const headerIndex = findObjectIndex(dataStructure.structure, 'itemName', whichHeader);
    return dataStructure.structure[headerIndex].items.map((field) => field.fieldName);
  };

  onDescriptionChange = (description: string): void => {
    const { MetaChange } = this.props;
    MetaChange(description, 'description');
  };

  onNewHeader = (newHeader: string): void => {
    const { AddOrRemoveHeader } = this.props;

    const headers = this.getStructureHeaders();
    if (!headers.includes(newHeader)) {
      AddOrRemoveHeader(newHeader, 'add');
    }
  };

  onRemoveHeader = (removeHeader: string): void => {
    const { AddOrRemoveHeader } = this.props;

    const headers = this.getStructureHeaders();
    if (headers.includes(removeHeader)) {
      AddOrRemoveHeader(removeHeader, 'remove');
    }
  };

  onNewField = (newField: string, selectedHeader: string): void => {
    const { AddOrRemoveField } = this.props;

    const fields = this.getStructureFields(selectedHeader);
    if (!fields.includes(newField)) {
      AddOrRemoveField(selectedHeader, newField, 'add');
    }
  };

  onRemoveField = (removeField: string, whichHeader: string): void => {
    const { AddOrRemoveField } = this.props;

    const fields = this.getStructureFields(whichHeader);
    if (fields.includes(removeField)) {
      AddOrRemoveField(whichHeader, removeField, 'remove');
    }
  };

  render() {
    const { dataStructure, sortStructure } = this.props;

    return (
      <Form inverted={DARK_MODE}>
        <Message
          style={{ paddingTop: 0 }}
          color={DARK_MODE === true ? 'black' : 'red'}
          floating
          list={['Press enter within inputs to add or change.']}
        />
        <Form.Group widths={3}>
          <HeaderInput onNewHeader={this.onNewHeader} />
          <FieldInput
            onNewField={this.onNewField}
            structureHeaders={this.getStructureHeaders()}
          />
        </Form.Group>
        <DescriptionInput
          description={dataStructure.description}
          onDescriptionChange={this.onDescriptionChange}
        />
        <Preview
          inverted={DARK_MODE}
          onSort={sortStructure}
          onRemoveHeader={this.onRemoveHeader}
          onRemoveField={this.onRemoveField}
          dataStructure={dataStructure}
        />
      </Form>
    );
  }
}

export default StructureItem;
