import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import App from './App';
import history from './history';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const Routes = () => {

  return (

    <Router history={history}>
      <Switch>
          <Route exact path="/" component={App}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
      </Switch>
    </Router>

  );
}

export default Routes;