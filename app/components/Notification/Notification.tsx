import React from 'react';
import { Message } from 'semantic-ui-react';
import { NotificationProps, NotificationTypes } from './types';

class Notification extends React.PureComponent<NotificationProps> {
  notificationTimer!: number;

  static defaultProps = {
    type: 'info' as NotificationTypes,
    title: '',
    message: '',
    timeOut: 5000,
    onClick: () => {},
    onRequestHide: () => {},
    customClassName: '',
  };

  componentDidMount = () => {
    const { timeOut } = this.props;
    if (timeOut !== 0) {
      this.notificationTimer = setTimeout(this.requestHide, timeOut);
    }
  };

  componentWillUnmount = () => {
    if (this.notificationTimer) {
      clearTimeout(this.notificationTimer);
    }
  };

  requestHide = () => {
    const { onRequestHide } = this.props;
    onRequestHide();
  };

  render() {
    const { type, message } = this.props;
    let { title } = this.props;
    title = title ? <h4 className="title">{title}</h4> : null;
    return (
      <Message
        info={type === 'info'}
        warning={type === 'warning'}
        success={type === 'success'}
        onClick={this.requestHide}
      >
        <Message.Header>{title}</Message.Header>
        <p>{message}</p>
      </Message>
    );
  }
}

export default Notification;
