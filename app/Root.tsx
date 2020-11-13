import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Store } from './redux/store';
import Routes from './Routes';

type IProps = {
  store: Store;
};

const Root = ({ store }: IProps): JSX.Element => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default hot(Root);
