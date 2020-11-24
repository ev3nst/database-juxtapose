import React from 'react';
import { Form } from 'semantic-ui-react';
import { DescriptionInputProps, DescriptionInputStates } from '../../types';
import { DARK_MODE } from '../../../../utils/constants';

class DescriptionInput extends React.Component<
  DescriptionInputProps,
  DescriptionInputStates
> {
  shouldComponentUpdate(nextProps: DescriptionInputProps): boolean {
    const { description } = this.props;
    if (description !== nextProps.description) {
      return true;
    }

    return false;
  }

  render(): JSX.Element {
    const { description, onDescriptionChange } = this.props;
    return (
      <Form.Input
        value={description}
        placeholder="Small description about what the structure is about.."
        transparent={DARK_MODE}
        className={DARK_MODE === true ? 'inverted-bordered' : undefined}
        onChange={(val) => onDescriptionChange(val.target.value)}
      />
    );
  }
}

export default DescriptionInput;
