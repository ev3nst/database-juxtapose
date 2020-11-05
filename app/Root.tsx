import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Store } from './redux/store';
import Routes from './Routes';

type Props = {
  store: Store;
};

const Root = ({ store }: Props): JSX.Element => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default hot(Root);
