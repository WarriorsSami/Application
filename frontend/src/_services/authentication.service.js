import { BehaviorSubject } from 'rxjs';

import {config} from '../config';
import { handleResponse } from '../_helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login, 
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }, 
    isUserLoggedIn, 
    register
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

function logout(){
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function isUserLoggedIn() {
    return (authenticationService.currentUserValue !== null && authenticationService.currentUserValue !== undefined);
}