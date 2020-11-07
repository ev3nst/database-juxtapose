import React from 'react';
import NotificationManager from './NotificationManager';
import Notifications from './Notifications';
import { NotificationContainerProps, NotificationContainerStates } from './types';

class NotificationContainer extends React.Component<
  NotificationContainerProps,
  NotificationContainerStates
> {
  static defaultProps = {
    enterTimeout: 400,
    leaveTimeout: 400,
  };

  constructor(props: NotificationContainerProps) {
    super(props);
    NotificationManager.addChangeListener(this.handleStoreChange);

    this.state = {
      notifications: [],
    };
  }

  componentWillUnmount = () => {
    NotificationManager.removeChangeListener(this.handleStoreChange);
  };

  handleStoreChange = (notifications: any) => {
    this.setState({
      notifications,
    });
  };

  handleRequestHide = (notification: any) => {
    NotificationManager.remove(notification);
  };

  render() {
    const { notifications } = this.state;
    const { enterTimeout } = this.props;
    return (
      <Notifications
        enterTimeout={enterTimeout}
        notifications={notifications}
        onRequestHide={this.handleRequestHide}
      />
    );
  }
}

export default NotificationContainer;
