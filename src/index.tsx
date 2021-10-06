import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from './redux/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import './styles/index.scss';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(
  thunk)
));
const app = (
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'));
