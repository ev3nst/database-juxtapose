import React from 'react';
import NotificationManager from './NotificationManager';
import Notification from './Notification';
import {
  NotificationContainerProps,
  NotificationInstance,
  NotificationContainerStates,
  NotificationUpdate,
} from './types';

const NotificationContainerStyles: React.CSSProperties = {
  position: 'absolute',
  top: 80,
  right: 15,
  zIndex: 9999,
  width: 200,
};
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

  render(): JSX.Element {
    const { notifications } = this.state;
    const { transitionDuration } = this.props;
    return (
      <div style={NotificationContainerStyles}>
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
