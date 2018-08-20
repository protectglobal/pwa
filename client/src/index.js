import 'unfetch/polyfill';
// "fetch" is now installed globally if it wasn't already available
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import BurgerBtnController from './components/header/burger-btn-controller';
// import HeaderTitle from './components/header/header-title';
import Routes from './routes';
import Menu from './components/menu';
import registerServiceWorker from './register-service-worker';

// ReactDOM.render(<App component={Routes} />, document.getElementById('root'));
// Inject react app components into App's Shell
ReactDOM.render(<App component={BurgerBtnController} />, document.getElementById('burger-btn-controller'));
// ReactDOM.render(<App component={HeaderTitle} />, document.getElementById('header-title'));
ReactDOM.render(<App component={Menu} />, document.getElementById('menu'));
ReactDOM.render(<App component={Routes} />, document.getElementById('main'));
registerServiceWorker();
