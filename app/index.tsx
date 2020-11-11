import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { configuredStore } from './redux/store';
import './i18n';
import './utils/styles/app.global.css';

const store = configuredStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

if (window.localStorage.getItem('dark_mode') === null) {
  window.localStorage.setItem('dark_mode', 'off');
}

document.addEventListener('DOMContentLoaded', async () => {
  const Root = require('./Root').default;
  render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    document.getElementById('root')
  );
});
