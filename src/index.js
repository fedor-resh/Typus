import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './themes.css'
import Router from './Router';
import './fonts/fonts.css'
import {Provider} from 'react-redux';
import store from './Redux/store';
import {ErrorBoundary} from './ErrorBaundary';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          {/*<ErrorBoundary>*/}
              <BrowserRouter>
                  <Router/>
              </BrowserRouter>
          {/*</ErrorBoundary>*/}
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


