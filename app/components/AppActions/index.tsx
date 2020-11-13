import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { WINDOW, DARK_MODE } from '../../utils/constants';
import LogoSvg from '../../../assets/logo.svg';

const AppActions = ({ classNames }: { classNames?: string }) => (
  <div
    className={
      DARK_MODE === true
        ? `outer-wrapper inverted ${classNames}`
        : `outer-wrapper ${classNames}`
    }
  >
    <div className="app-drag">
      <img className="logo" src={LogoSvg} alt="logo" />
    </div>
    <div className="action-buttons">
      <Menu.Item onClick={() => WINDOW.minimize()}>
        <Icon size="small" name="window minimize outline" />
      </Menu.Item>
      <Menu.Item
        onClick={() => (WINDOW.isMaximized() ? WINDOW.unmaximize() : WINDOW.maximize())}
      >
        <Icon size="small" name="clone outline" />
      </Menu.Item>
      <Menu.Item onClick={() => WINDOW.close()}>
        <Icon size="small" name="close" />
      </Menu.Item>
    </div>
  </div>
);

AppActions.defaultProps = {
  classNames: '',
};

export default AppActions;
