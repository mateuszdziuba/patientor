import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { reducer, StateProvider } from './state';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </Router>,
  document.getElementById('root')
);
