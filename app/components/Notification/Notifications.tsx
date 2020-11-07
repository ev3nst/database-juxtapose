import React from 'react';
import { Transition } from 'semantic-ui-react';
import Notification from './Notification';
import { NotificationsProps } from './types';

class Notifications extends React.Component<NotificationsProps> {
  static defaultProps = {
    notifications: [],
    onRequestHide: () => {},
    enterTimeout: 400,
  };

  handleRequestHide = (notification: any) => () => {
    const { onRequestHide } = this.props;
    onRequestHide(notification);
  };

  render() {
    const { notifications, enterTimeout } = this.props;
    return (
      <div>
        {notifications.map((notification) => {
          const key = notification.id || new Date().getTime();
          return (
            <Transition classNames="notification" key={key} duration={enterTimeout}>
              <Notification
                key={key}
                type={notification.type}
                title={notification.title}
                message={notification.message}
                timeOut={notification.timeOut}
                onClick={notification.onClick}
                onRequestHide={this.handleRequestHide(notification)}
                customClassName={notification.customClassName}
              />
            </Transition>
          );
        })}
      </div>
    );
  }
}

export default Notifications;
