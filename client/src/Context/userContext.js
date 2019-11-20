import React, { Component, createContext } from 'react';
import apiService from '../Services/apiService';
import tokenService from '../Services/tokenService';

const UserContext = createContext({
    user: {},
    processLogin: () => {},
    logoutUser: () => {}
});

export default UserContext;

export class UserProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    };

    processLogin = async () => {
        const jwtPayload = await tokenService.parseAuthToken();
        this.setUser({
            id: jwtPayload.id,
            user_name: jwtPayload.sub
        })
    };

    setUser = user => {
        this.setState({ user });
    };

    logoutUser = () => {
        this.setState({ user: {} }, () => tokenService.clearAuthToken());
    };

    render() {
        const value = {
          user: this.state.user,
          processLogin: this.processLogin,
          logoutUser: this.logoutUser
        }
    
        return (
          <UserContext.Provider value={value}>
            { this.props.children }
          </UserContext.Provider>
        )
    }
};
