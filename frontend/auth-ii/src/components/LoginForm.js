import React from 'react';
import axios from 'axios';

class LoginForm extends React.Component {
    state = {
        
            username: 'rkolk',
            password: 'tysoncat',
            
        
        
    };

    handleChange = e => {
        this.setState({
            
                ...this.state,
                [e.target.name]: e.target.value
            
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        const endpoint = 'http://localhost:3000/api/login';

        axios
            .post(endpoint, this.state)
            .then(res => {
                localStorage.setItem('jwt', res.data.token);

                this.props.history.push('/users'); 
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
                            placeholder="type your username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />

                        {/* <label htmlFor="department"/>
                        <input 
                            name="department"
                            id="department"
                            placeholder="enter your department"
                            type="text"
                            value={this.state.department}
                            onChange={this.handleChange}
                        /> */}

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
                        <button type="submit">Login</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default LoginForm;