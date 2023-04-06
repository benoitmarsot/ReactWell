'use strict';
import http from './http';
var register = function(provider) {    
    return http.post('/api/pro/register', provider, null);
};

export default {
    register: register
};


