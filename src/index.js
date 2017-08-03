import React from 'react';
import ReactDOM from 'react-dom'; 
import registerServiceWorker from './registerServiceWorker';
import Routes from './Routes';
import 'semantic-ui-css/semantic.min.css';
import {Provider} from 'react-redux';
import store from './Store';


ReactDOM.render(
<Provider store={store}>
    <Routes />
</Provider>
, document.getElementById('root'));
registerServiceWorker();

