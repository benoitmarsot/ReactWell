import React, { useState, useEffect } from 'react';
import patientSvc from '../services/patient.js';

const SelectPatient = (props) => {
    const error=(!props)?"No props":
            !props.provider?"No Provider":
            !props.provider.patients?"No clients":'';
    if(error) {
        return <div>{error}</div>;
    }
    const changePatient=props.onChangePatient;
    const handleChange = (event) => {
        patientSvc.getPatient(event.target.value).then(patient => {
            changePatient(patient);
        });
    };
    const patients=props.provider.patients;
    const patientId=props.patientid||patients[0].patientId;
    useEffect(() => {
        patientSvc.getPatient(patientId).then(patient => {
            changePatient(patient);
        });
    }, []);
    const po=[];
    for(let ind=0;ind<patients.length;ind++) {
        po.push((<option key={patients[ind].patientId} value={patients[ind].patientId}>
            {patients[ind].firstName} {patients[ind].lastName}</option>)
        );
    }
    
    return (
            <div>
                <h2>Select a patient</h2>
                <select value={patientId} onChange={handleChange}>
                    {po}
                </select>
            </div>
    );
};

export default SelectPatient;
