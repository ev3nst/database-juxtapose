import React from 'react';
import { Form } from 'semantic-ui-react';
import { HeaderFormProps, HeaderFormStates } from './types';

class HeaderForm extends React.Component<HeaderFormProps, HeaderFormStates> {
  constructor(props: HeaderFormProps) {
    super(props);

    this.state = {
      newHeader: '',
    };
  }

  shouldComponentUpdate(
    _nextProps: HeaderFormProps,
    prevStates: HeaderFormStates
  ): boolean {
    const { newHeader } = this.state;
    if (newHeader !== prevStates.newHeader) {
      return true;
    }

    return false;
  }

  onEnter() {
    const { newHeader } = this.state;
    const { onNewHeader } = this.props;
    if (newHeader.length !== 0) {
      onNewHeader(newHeader);
      this.setState({
        newHeader: '',
      });
    }
  }

  render(): JSX.Element {
    const { newHeader } = this.state;
    return (
      <Form.Input
        fluid
        label="New Header"
        value={newHeader}
        placeholder="New Header"
        onChange={(val) =>
          this.setState({
            newHeader: val.target.value,
          })
        }
        onKeyUp={(e: React.KeyboardEvent) => (e.key === 'Enter' ? this.onEnter() : null)}
      />
    );
  }
}

export default HeaderForm;
