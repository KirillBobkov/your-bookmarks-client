import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './context/store';

import App from './App';

import './index.scss';

const render = (): void => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

const enableHMR = (): void => {
  if (module.hot) {
  // @ts-ignore
    module.hot.accept(undefined, (): void => {
      render();
    });
  }
};

render();
enableHMR();
