import React, { useState, useEffect, useContext } from 'react';
import patientSvc from '../services/patient.js';
import { ProviderContext } from '../App.jsx';

const SelectPatient = (props) => {
    const {provider} = useContext(ProviderContext);
    console.log("selectPatient: ",provider);
    const error=!provider?"No Provider":
            !provider.patients.length?"No clients":'';
    if(error) {
        return <div>{error}</div>;
    }
    const changePatient=props.onChangePatient;
    const handleChange = (event) => {
        patientSvc.getPatient(event.target.value).then(patient => {
            changePatient(patient);
        });
    };
    const patients=provider.patients;
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
