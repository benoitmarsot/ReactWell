import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import patientSvc from '../services/patient.js';

import './signup.css';

const SignInPatient = (props) => {
    const navigate=useNavigate();
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [errorMsg,setErrorMsg] = useState(null);
    const onChangePatient=props.onChangePatient;
    const onSetPatientPortal=props.onSetPatientPortal;
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    };

    const handleSubmit  = (e) => {
        e.preventDefault();
        const patientInfo={email:email,password:password};
        patientSvc.signIn(patientInfo).then((patient)=>{
            if(patient.status===401) {
                setErrorMsg(patient.title);
                return;
            }
            console.log(patient);
            onSetPatientPortal(true);
            onChangePatient(patient); 
            return navigate('/selectprovider');
        }, (error) => {
            setErrorMsg(!error.error?error:error.error);
        });
    };
    const Error= (props) => {
        return props.errorMsg
            ?(<div>{props.errorMsg}</div>)
            :'';
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-body">
                    <div className="row">
                    <div className="col-25">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="email" name="email" placeholder="email.." onChange={handleInputChange}/>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-25">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="col-75">
                        <input type="password"  id="password" name="password" placeholder="Password.." onChange={handleInputChange} />
                    </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="submit" className="btn">Sign in</button>
                </div>
            </form>
            <Error errorMsg={errorMsg} />
        </div>

    );
};

export default SignInPatient;
