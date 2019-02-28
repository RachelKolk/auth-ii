import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

axios.interceptors.request.use(
    function(options) {
        options.headers.authorization = localStorage.getItem('jwt');

        return options;
    },

    function(error) {
        console.log(error);
        return Promise.reject(error);
    }
);

export default function(Component) {
    return class Authenticated extends React.Component {
        render() {
            const token = localStorage.getItem('jwt');
            const notLoggedIn = <div>Please login to access user list</div>;

            return <> {token ? <Component {...this.props} /> : notLoggedIn} </>;
        }
    };
}