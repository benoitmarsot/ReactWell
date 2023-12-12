'use strict';
import http from './http';
const register = function(provider) {    
    return http.post('/api/pro/register', provider, null);
};
const signIn = function(credential) {
    return http.post('/api/pro/signin', credential, null);
};
const updateProvider= function(provider) {    
    return http.post('/api/pro/updateprovider', provider, null);
};
const getProvider = function( providerId) {
    const provider=http.get('/api/pro/getprovider?providerid='+providerId, null);
    return provider;
};
export default {
    register: register,
    signIn: signIn,
    updateProvider: updateProvider,
    getProvider:getProvider
};


