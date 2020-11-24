import React from 'react';
import { Form } from 'semantic-ui-react';
import { FieldInputProps, FieldInputStates } from '../../types';
import { DARK_MODE } from '../../../../utils/constants';

class FieldInput extends React.Component<FieldInputProps, FieldInputStates> {
  constructor(props: FieldInputProps) {
    super(props);

    this.state = {
      newField: '',
    };
  }

  shouldComponentUpdate(
    nextProps: FieldInputProps,
    prevStates: FieldInputStates
  ): boolean {
    const { newField, selectedHeader } = this.state;
    const { structureHeaders } = this.props;
    if (
      newField !== prevStates.newField ||
      selectedHeader !== prevStates.selectedHeader ||
      structureHeaders.length !== nextProps.structureHeaders.length
    ) {
      return true;
    }

    return false;
  }

  onEnter() {
    const { selectedHeader, newField } = this.state;
    const { onNewField } = this.props;
    if (selectedHeader !== undefined && selectedHeader.length !== 0) {
      onNewField(newField, selectedHeader);
      this.setState({
        newField: '',
      });
    }
  }

  getHeaderOptions() {
    const { structureHeaders } = this.props;
    return structureHeaders.map((header: string) => {
      return { key: header, text: header, value: header };
    });
  }

  render(): JSX.Element {
    const { newField } = this.state;
    return (
      <>
        <Form.Select
          fluid
          label="Select Header"
          options={this.getHeaderOptions()}
          placeholder="Select Header"
          className="inverted"
          onChange={(_e, { value }) => {
            this.setState({
              selectedHeader: String(value),
            });
          }}
        />

        <Form.Input
          fluid
          label="New Field"
          value={newField}
          placeholder="New Field"
          transparent={DARK_MODE}
          className={DARK_MODE === true ? 'inverted-bordered' : undefined}
          onChange={(val) =>
            this.setState({
              newField: val.target.value,
            })
          }
          onKeyUp={(e: React.KeyboardEvent) =>
            e.key === 'Enter' ? this.onEnter() : null
          }
        />
      </>
    );
  }
}

export default FieldInput;
