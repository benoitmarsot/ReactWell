'use strict';
import http from './http';

var register = function(providerId,patient) {    
    return http.post('/api/pro/registerpatient?providerid='+providerId, patient, null);
};
const updatePatient = function(patientId,patient) {    
    return http.post('/api/patient/updatepatient?patientid='+patientId, patient, null);
};
const getPatient = function( patientId) {
    
    const patient=http.get('/api/patient/getpatient?patientid='+patientId, null);
    return patient;
};

export default {
    register: register,
    updatePatient: updatePatient,
    getPatient:getPatient
};


