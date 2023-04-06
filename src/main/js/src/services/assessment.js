'use strict';
import http from './http';
var getAssessment = function(providerId, patientId) {    
    return http.get('/api/pro/assessment?providerid='+providerId+'&patientid='+patientId, null, null);
};
var putAssessment = function(providerId, patientId, assessment) {    
    return http.put('/api/pro/assessment?providerid='+providerId+'&patientid='+patientId, assessment, null);
};

export default {
    getAssessment: getAssessment,
    putAssessment: putAssessment,
};


