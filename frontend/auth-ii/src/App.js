import React, { Component } from 'react';
import {Route, NavLink, withRouter} from 'react-router-dom';

import './App.css';
import Users from './components/Users';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

class App extends Component {

  logout = () => {
    localStorage.removeItem('jwt');
    this.props.history.push('/login');
  };

  
  render() {
    return (
      <div className="App">
        <header>
        <nav>
          <NavLink to="/signup">Register</NavLink>

          <NavLink to="/signin">Login</NavLink>

          <NavLink to="/users">Users</NavLink>

          <button>Logout</button>
        </nav>
        </header>

        <main>
          <Route path="/signup" component={RegistrationForm}/>
          <Route path="/signin" component={LoginForm}/>
          <Route path="/users" component={Users}/>
        </main>
      </div>
    );
  }

  
}

export default withRouter(App);
