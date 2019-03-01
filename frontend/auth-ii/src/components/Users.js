import React from 'react';
import axios from 'axios';

import requiresAuth from '../authorization/requiresAuth';

class Users extends React.Component {
    state = {
        users: [],
    };

    componentDidMount() {
        axios.get('/users').then(res => {
            this.setState({users: res.data.users});
        });
    }

    render () {
        return (
            <>
                <h3>The Users List</h3>
                <ul> 
                    {this.state.users.map(u => (
                        <li key={u.id}>{u.username}</li>
                    ))}
                </ul>

            </>
        );
    }

   

}

export default requiresAuth(Users);