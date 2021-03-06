import React from 'react';
import { Form } from 'semantic-ui-react';
import { HeaderInputProps, HeaderInputStates } from '../../types';
import { DARK_MODE } from '../../../../utils/constants';

class HeaderInput extends React.Component<HeaderInputProps, HeaderInputStates> {
  constructor(props: HeaderInputProps) {
    super(props);

    this.state = {
      newHeader: '',
    };
  }

  shouldComponentUpdate(
    _nextProps: HeaderInputProps,
    prevStates: HeaderInputStates
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
        transparent={DARK_MODE}
        className={DARK_MODE === true ? 'inverted-bordered' : undefined}
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

export default HeaderInput;
