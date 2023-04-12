'use strict';
import http from './http';
const register = function(provider) {    
    return http.post('/api/pro/register', provider, null);
};
const signIn = function(provider) {
    return http.post('/api/pro/signin', provider, null);
};
const updateProvider= function(provider) {    
    return http.post('/api/pro/updateprovider', provider, null);
};
export default {
    register: register,
    signIn: signIn,
    updateProvider: updateProvider
};


