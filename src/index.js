import 'es5-shim';
import 'es6-shim';

import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import App from './App';

import './styles/global.css';

ReactDOM.render(<App />, document.getElementById('root'));
