import React from 'react';
import axios from 'axios';

class LoginForm extends React.Component {
    state = {
        user: {
            username: '',
            password: '',
            department: ''
        }
        
    };

    handleChange = e => {
        this.serState({
            user: {
                ...this.state.user,
                [e.traget.name]: e.target.value
            }
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        const endpoint = 'http://localhost:3000/api/register';

        axios
            .post(endpoint, this.state)
            .then(res => {
               this.props.history.push('/signin'); 
            })
            .catch(err => console.log(err));
    };



    render() {
        return (
            <div className="Login">
                <h3>Please login</h3>

                <form onSubmit={this.handleSubmit}>
                
                    <div>
                        <label htmlFor="username"/>
                        <input 
                            name="username"
                            id="username"
                            placeholder="type a username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />

                        <label htmlFor="department"/>
                        <input 
                            name="department"
                            id="department"
                            placeholder="enter your department"
                            type="text"
                            value={this.state.department}
                            onChange={this.handleChange}
                        />

                        <label htmlFor="password"/>
                        <input 
                            name="password"
                            id="password"
                            placeholder="enter your password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <button type="submit">Register Now</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default LoginForm;