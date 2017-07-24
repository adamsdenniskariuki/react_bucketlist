import React from 'react';
import ReactDOM from 'react-dom'; 
import registerServiceWorker from './registerServiceWorker';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom'

// const browserHistory = createBrowserHistory();

ReactDOM.render(
<BrowserRouter>
    <Routes />
</BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
