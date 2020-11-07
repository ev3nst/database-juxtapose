import React from 'react';
import { Message, Transition } from 'semantic-ui-react';
import { NotificationProps, NotificationInstance } from './types';

export type IState = {
  showTransition: boolean;
};

class Notification extends React.Component<NotificationProps, IState> {
  notificationTimer!: number;

  constructor(props: NotificationProps) {
    super(props);

    this.state = {
      showTransition: true,
    };
  }

  shouldComponentUpdate(_nextProps: NotificationProps, prevState: IState) {
    const { showTransition } = this.state;
    if (prevState.showTransition !== showTransition) {
      return true;
    }

    return false;
  }

  componentDidMount = () => {
    const { item } = this.props;
    if (item.timeOut !== undefined && item.timeOut !== 0) {
      this.notificationTimer = this.requestHide(item);
    }
  };

  componentWillUnmount = () => {
    if (this.notificationTimer) {
      clearTimeout(this.notificationTimer);
    }
  };

  requestHide = (item: NotificationInstance) => {
    const { onRequestHide } = this.props;

    return setTimeout(() => {
      this.setState({
        showTransition: false,
      });
      setTimeout(() => onRequestHide(item));
    }, item.timeOut);
  };

  render() {
    const { item, transitionDuration } = this.props;
    const { showTransition } = this.state;
    const TitleElem = item.title ? <h4 className="title">{item.title}</h4> : null;

    return (
      <Transition
        animation="scale"
        visible={showTransition}
        duration={transitionDuration}
      >
        <Message
          info={item.type === 'info'}
          warning={item.type === 'warning'}
          success={item.type === 'success'}
          error={item.type === 'error'}
          onClick={this.requestHide}
        >
          <Message.Header>{TitleElem}</Message.Header>
          <p>{item.message}</p>
        </Message>
      </Transition>
    );
  }
}

export default Notification;
