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
          &nbsp;|&nbsp;
          <NavLink to="/signin">Login</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/users">Users</NavLink>
          &nbsp;|&nbsp;
          <button onClick={this.logout}>Logout</button>
        </nav>
        </header>

        <main>
          <Route exact path="/signup"
            render={props => <RegistrationForm {...props}/> } />
          <Route path="/signin" 
            render={props => <LoginForm {...props} /> } />
          <Route path="/users"
            render={props => <Users {...props} /> } />
        </main>
      </div>
    );
  }

  
}

export default withRouter(App);
