import React from 'react';
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

  render(): JSX.Element {
    const { onNewHeader } = this.props;
    const { newHeader } = this.state;
    return (
      <form>
        <div>
          <h5>New Content</h5>
          <input
            type="text"
            value={newHeader}
            onChange={(val) =>
              this.setState({
                newHeader: val.target.value,
              })
            }
          />
        </div>
        <button
          disabled={newHeader.length === 0}
          type="button"
          onClick={() => {
            onNewHeader(newHeader);
            this.setState({
              newHeader: '',
            });
          }}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default HeaderForm;
