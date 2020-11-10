import React from 'react';
import { FieldFormProps, FieldFormStates } from './types';

class FieldForm extends React.Component<FieldFormProps, FieldFormStates> {
  constructor(props: FieldFormProps) {
    super(props);

    this.state = {
      newField: '',
    };
  }

  shouldComponentUpdate(nextProps: FieldFormProps, prevStates: FieldFormStates): boolean {
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

  renderHeaderOptions(): JSX.Element[] {
    const { structureHeaders } = this.props;
    return structureHeaders.map((header: string) => (
      <option key={header} value={header}>
        {header}
      </option>
    ));
  }

  render(): JSX.Element {
    const { onNewField } = this.props;
    const { newField, selectedHeader } = this.state;
    return (
      <form>
        <div>
          <h5>Sub Content</h5>
          <br />
          <select
            onChange={(val) => {
              this.setState({
                selectedHeader: val.target.value,
              });
            }}
          >
            <option value="">Select Header</option>
            {this.renderHeaderOptions()}
          </select>
          <br />
          <input
            type="text"
            value={newField}
            onChange={(val) =>
              this.setState({
                newField: val.target.value,
              })
            }
          />
        </div>
        <button
          disabled={
            selectedHeader === undefined ||
            newField.length === 0 ||
            selectedHeader.length === 0
          }
          type="button"
          onClick={() => {
            onNewField(newField, String(selectedHeader));
            this.setState({
              newField: '',
            });
          }}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default FieldForm;
