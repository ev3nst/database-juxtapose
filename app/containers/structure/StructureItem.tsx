import React from 'react';
import { Form } from 'semantic-ui-react';
import Preview from './Preview';
import FieldForm from './FieldForm';
import HeaderForm from './HeaderForm';
import { findObjectIndex } from '../../utils/functions';
import { DARK_MODE } from '../../utils/constants';
import { StructureItemProps } from './types';

class StructureItem extends React.PureComponent<StructureItemProps> {
  getStructureHeaders = (): Array<string> => {
    const { dataStructure } = this.props;
    return dataStructure.map((structure) => structure.name);
  };

  getStructureFields = (whichHeader: string): Array<string> => {
    const { dataStructure } = this.props;
    const headerIndex = findObjectIndex(dataStructure, 'name', whichHeader);
    return dataStructure[headerIndex].items.map((field) => field.name);
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
      <>
        <Form inverted={DARK_MODE}>
          <Form.Group widths={3}>
            <HeaderForm onNewHeader={this.onNewHeader} />
            <FieldForm
              onNewField={this.onNewField}
              structureHeaders={this.getStructureHeaders()}
            />
          </Form.Group>
        </Form>
        <Preview
          inverted={DARK_MODE}
          onSort={sortStructure}
          onRemoveHeader={this.onRemoveHeader}
          onRemoveField={this.onRemoveField}
          dataStructure={dataStructure}
        />
      </>
    );
  }
}

export default StructureItem;
