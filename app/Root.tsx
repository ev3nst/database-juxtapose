import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Menu, Icon } from 'semantic-ui-react';
import { Store } from './redux/store';
import Routes from './Routes';
import { DARK_MODE, WINDOW } from './utils/constants';
import LogoSvg from '../assets/logo.svg';

const AppActions = () => (
  <div className={DARK_MODE === true ? 'outer-wrapper inverted' : 'outer-wrapper'}>
    <div className="app-drag">
      <img className="logo" src={LogoSvg} alt="logo" />
    </div>
    <div className="action-buttons">
      <Menu.Item className="action-button-left-border" onClick={() => WINDOW.minimize()}>
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

type IProps = {
  store: Store;
};

const Root = ({ store }: IProps): JSX.Element => (
  <Provider store={store}>
    <AppActions />
    <Routes />
  </Provider>
);

export default hot(Root);
