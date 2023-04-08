import React, { useState, useEffect } from 'react';

const SelectPatient = (props) => {
    const error=(!props)?"No props":
            !props.provider?"No Provider":
            !props.provider.patients?"No clients":'';
    if(error) {
        return <div>{error}</div>;
    }
    const changePatient=props.onChangePatient;
    const handleChange = (event) => {
        useEffect(() => {
            changePatient(event.target.key);
          }, []);
        
    };
    const patients=props.provider.patients;
    if(patients.length === 1 ) {
        useEffect(() => {
            changePatient(patients[0].patientId);
          }, []);
        
        
    }
    const po=[];
    for(let ind=0;ind<patients.length;ind++) {
        po.push((<option key={patients[ind].patientId} value={patients[ind].patientId}>
            {patients[ind].firstName} {patients[ind].lastName}</option>)
        );
    }
    
    return (
            <div>
                <h2>Select a patient</h2>
                <select onChange={handleChange}>
                    {po}
                </select>
            </div>
    );
};

export default SelectPatient;
