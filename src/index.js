import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import './fonts/fonts.css'
import {Provider} from 'react-redux';
import store from './Redux/store';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


