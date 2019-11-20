import tokenService from './tokenService';
import config from '../config';

const apiService = {
    registerUser(user_name, password) {
        return fetch(`${config.API_ENDPOINT}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ user_name, password })
        })
        .then(res => {
            if (!res.ok) {
                return new Error('could not register')
            }
            return res.json();
        })
    },

    loginUser(user_name, password) {
        return fetch(`${config.API_ENDPOINT}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ user_name, password})
        })
        .then(res => {
            if (!res.ok) {
                return new Error('could not login user');
            }
            return res.json();
        })
    },

    getSnippets() {
        return fetch(`${config.API_ENDPOINT}/snippets`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${ tokenService.getAuthToken() }`
            }
        })
        .then(res => {
            if (!res.ok) {
              return new Error('could not fetch snippets')
            }
            return res.json();
          })
    }
};

export default apiService;