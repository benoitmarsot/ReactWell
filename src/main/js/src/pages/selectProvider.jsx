import React, { useEffect, useContext } from 'react';
import providerSvc from '../services/provider.js';
import { PatientContext } from '../App.jsx';

const SelectProvider = (props) => {
    const {patient} = useContext(PatientContext);
    console.log("selectProvider: ",patient);
    const error=!patient?"No Patient":
            !patient.providers.length?"No providers":'';
    if(error) {
        return <div>{error}</div>;
    }
    const changeProvider=props.onChangeProvider;
    const handleChange = (event) => {
        providerSvc.getProvider(event.target.value).then(provider => {
            changeProvider(provider);
        });
    };
    const providers=patient.providers;
    const providerId=props.providerid||providers[0].providerId;
    useEffect(() => {
        providerSvc.getProvider(providerId).then(provider => {
            changeProvider(provider);
        });
    }, []);
    const po=[];
    for(let ind=0;ind<providers.length;ind++) {
        po.push((<option key={providers[ind].providerId} value={providers[ind].providerId}>
            {providers[ind].firstName} {providers[ind].lastName}</option>)
        );
    }
    
    return (
            <div>
                <h2>Select a provider</h2>
                <select value={providerId} onChange={handleChange}>
                    {po}
                </select>
            </div>
    );
};

export default SelectProvider;
