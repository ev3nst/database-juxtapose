import React from 'react';
import NotificationManager from './NotificationManager';
import Notification from './Notification';
import {
  NotificationContainerProps,
  NotificationInstance,
  NotificationContainerStates,
  NotificationUpdate,
} from './types';

class NotificationContainer extends React.Component<
  NotificationContainerProps,
  NotificationContainerStates
> {
  static defaultProps = {
    transitionDuration: 200,
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

  handleStoreChange: NotificationUpdate = (
    notifications: Array<NotificationInstance>
  ) => {
    this.setState({
      notifications,
    });
  };

  handleRequestHide = (notification: NotificationInstance) => {
    const { transitionDuration } = this.props;
    setTimeout(() => {
      NotificationManager.remove(notification);
    }, transitionDuration);
  };

  render() {
    const { notifications } = this.state;
    const { transitionDuration } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          top: 50,
          right: 50,
          zIndex: 9999,
          width: 200,
        }}
      >
        {notifications.map((notification) => {
          const key = notification.id || new Date().getTime();
          return (
            <Notification
              key={key}
              item={notification}
              transitionDuration={transitionDuration}
              onRequestHide={this.handleRequestHide}
            />
          );
        })}
      </div>
    );
  }
}

export default NotificationContainer;
