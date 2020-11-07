/* eslint-disable no-bitwise */
import { EventEmitter } from 'events';
import { NotificationInstance, NotificationUpdate } from './types';

const createUUID = (): string => {
  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

class NotificationManager extends EventEmitter {
  listNotify = [];

  create(notify: NotificationInstance) {
    const defaultNotify = {
      id: createUUID(),
      type: 'info',
      title: null,
      message: null,
      timeOut: 5000,
    };
    this.listNotify.push(Object.assign(defaultNotify, notify));
    this.emitChange();
  }

  notificate({ type, message, title, timeOut }: NotificationInstance) {
    this.create({
      type,
      title,
      message,
      timeOut,
    });
  }

  remove(notification: NotificationInstance) {
    this.listNotify = this.listNotify.filter(
      (n: NotificationInstance) => notification.id !== n.id
    );
    this.emitChange();
  }

  emitChange() {
    this.emit('change', this.listNotify);
  }

  addChangeListener(callback: NotificationUpdate) {
    this.addListener('change', callback);
  }

  removeChangeListener(callback: NotificationUpdate) {
    this.removeListener('change', callback);
  }
}

export default new NotificationManager();
