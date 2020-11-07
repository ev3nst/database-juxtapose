export type NotificationTypes = 'info' | 'warning' | 'success' | 'error';

export type NotificationHide = (notifications?: Array<any>) => void;

export interface NotificationProps {
  id?: string;
  type: NotificationTypes;
  title: string | JSX.Element | null;
  message?: string;
  timeOut?: number;
  onRequestHide: NotificationHide;
}

export type NotificationContainerProps = {
  enterTimeout: number;
  leaveTimeout: number;
};

export type NotificationContainerStates = {
  notifications: Array<any>;
};

export interface NotificationsProps {
  notifications: Array<any>;
  enterTimeout: number;
  onRequestHide: NotificationHide;
}
