export type NotificationTypes = 'info' | 'warning' | 'success' | 'error';

export interface NotificationInstance {
  id?: string;
  type: NotificationTypes;
  title: string;
  message?: string;
  timeOut?: number;
}

export interface NotificationProps {
  item: NotificationInstance;
  onRequestHide: NotificationHide;
  transitionDuration?: number;
}

export type NotificationUpdate = (notifications: Array<NotificationInstance>) => void;

export type NotificationHide = (notification: NotificationInstance) => void;

export type NotificationContainerProps = {
  transitionDuration: number;
  leaveTimeout: number;
};

export type NotificationContainerStates = {
  notifications: Array<NotificationInstance>;
};

export interface NotificationsProps {
  notifications: Array<NotificationProps>;
  transitionDuration: number;
  onRequestHide: NotificationHide;
}
