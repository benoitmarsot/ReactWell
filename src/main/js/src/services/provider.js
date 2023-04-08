'use strict';
import http from './http';
var register = function(provider) {    
    return http.post('/api/pro/register', provider, null);
};
var signIn = function(provider) {
    return http.post('/api/pro/signin', provider, null);
};

export default {
    register: register,
    signIn: signIn
};


