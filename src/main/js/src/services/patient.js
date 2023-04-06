'use strict';
import http from './http';

var register = function(providerId,patient) {    
    return http.post('/api/pro/registerpatient?providerid='+providerId, patient, null);
};

export default {
    register: register
};


