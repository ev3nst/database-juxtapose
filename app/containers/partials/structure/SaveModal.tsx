import React from 'react';
import { Modal, Header, Icon, Button, Input, Message, Divider } from 'semantic-ui-react';
import { SaveModalProps, SaveModalStates } from './types';

class SaveModal extends React.Component<SaveModalProps, SaveModalStates> {
  fileNameInputRef!: React.RefObject<Input>;

  constructor(props: SaveModalProps) {
    super(props);

    this.fileNameInputRef = React.createRef();

    this.state = {
      fileName: '',
      showModal: false,
      errorState: false,
      errorMessage: '',
    };
  }

  shouldComponentUpdate(
    _nextProps: SaveModalProps,
    prevStates: SaveModalStates
  ): boolean {
    const { fileName, errorState, showModal } = this.state;
    if (
      showModal !== prevStates.showModal ||
      fileName !== prevStates.fileName ||
      errorState !== prevStates.errorState
    ) {
      return true;
    }

    return false;
  }

  componentDidUpdate(): void {
    const { showModal } = this.state;
    if (
      this.fileNameInputRef !== undefined &&
      this.fileNameInputRef !== null &&
      this.fileNameInputRef.current !== null &&
      showModal === true
    ) {
      this.fileNameInputRef.current.focus();
    }
  }

  onConfirmCallback(fileName: string): void {
    const { onConfirm } = this.props;
    if (fileName !== '') {
      this.setState({
        fileName: '',
        errorState: false,
        errorMessage: '',
        showModal: false,
      });
      onConfirm(fileName);
    } else {
      this.setState({
        errorState: true,
        errorMessage: 'File name cannot be empty.',
      });
    }
  }

  render(): JSX.Element {
    const { pathPrefix, inverted } = this.props;
    const { fileName, showModal, errorState, errorMessage } = this.state;
    return (
      <Modal
        basic
        open={showModal}
        trigger={
          <Button
            size="tiny"
            color={inverted === true ? 'green' : undefined}
            inverted={inverted}
            onClick={() => this.setState({ showModal: true })}
          >
            SAVE
          </Button>
        }
        size="small"
      >
        <Header icon inverted={inverted}>
          <Icon name="save" />
          Save Data Structure
        </Header>
        <Modal.Content>
          <div>File Name</div>
          <Input
            error={errorState}
            fluid
            labelPosition="left"
            label={pathPrefix}
            icon={
              <div
                className={
                  inverted === true ? 'input-right-label inverted' : 'input-right-label'
                }
              >
                .json
              </div>
            }
            value={fileName}
            placeholder="filename"
            ref={this.fileNameInputRef}
            onKeyUp={(e: React.KeyboardEvent) =>
              e.key === 'Enter' ? this.onConfirmCallback(fileName) : null
            }
            onChange={(val) =>
              this.setState({
                errorState: false,
                fileName: val.target.value,
              })
            }
          />
          <Divider hidden />
          <p>
            This data structure will be saved under structures folder with specified name.
          </p>
          {errorState === true && (
            <Message
              color={inverted === true ? 'black' : 'red'}
              floating
              header="Failed to save"
              list={[errorMessage]}
            />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => {
              this.setState({
                showModal: false,
                fileName: '',
                errorState: false,
                errorMessage: '',
              });
            }}
          >
            <Icon name="remove" /> Cancel
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              this.onConfirmCallback(fileName);
            }}
          >
            <Icon name="checkmark" /> Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SaveModal;
