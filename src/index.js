import React from 'react';
import ReactDOM from 'react-dom'; 
import registerServiceWorker from './registerServiceWorker';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'semantic-ui-css/semantic.min.css';

// injectTapEventPlugin();

ReactDOM.render(
<BrowserRouter>
    <Routes />
</BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
