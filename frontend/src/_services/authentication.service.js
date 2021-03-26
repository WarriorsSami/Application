import { BehaviorSubject } from 'rxjs';

import {config} from '../config';
import { handleResponse } from '../_helpers/handle-response';
import {authHeader} from "../_helpers/auth-header";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login, 
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }, 
    isUserLoggedIn, 
    register,
    update
};

function login(username, password) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    
    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
            .then(handleResponse)
            .then(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
            });
}

function register(firstname, lastname, username, email, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, username, email, password })
    };
    
    return fetch(`${config.apiUrl}/users/create`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
        });
}

function update(firstname, lastname, username, email, password) {

    const authOptions = authHeader();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': authOptions.Authorization  },
        body: JSON.stringify({ firstname, lastname, username, email, password })
    };

    return fetch(`${config.apiUrl}/users/update`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let newUser = {
                id: authenticationService.currentUserValue.id,
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
                username: res.username,
                token: authenticationService.currentUserValue.token
            };
            localStorage.setItem('currentUser', JSON.stringify(newUser));
        });
}

function logout(){
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function isUserLoggedIn() {
    return (authenticationService.currentUserValue !== null && authenticationService.currentUserValue !== undefined);
}