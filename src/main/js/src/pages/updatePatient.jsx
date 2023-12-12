import React, {useState,setState,useContext} from 'react';
import SelectUSState from 'react-select-us-states'
import patientSvc from '../services/patient.js';
import { PatientContext } from '../App.jsx';
import './UpdatePatient.css';

const UpdatePatient = (props) => {
    const {patient} = useContext(PatientContext);
    if(!props||!props.providerid) {
        return <div>Error: no provider</div>;
    }
    if(!patient) {
        return <div>Error: no patient</div>;
    }
    const providerId=props.providerid;
    const patientId=patient.patientId;
    const [firstName, setFirstName] = useState(patient.firstName||'');
    const [lastName, setLastName] = useState(patient.lastName||'');
    const [referral, setReferral] = useState(patient.referral||'');
    const [address, setAddress] = useState(patient.address||'');
    const [city, setCity] = useState(patient.city||'');
    const [usState, setUsState] = useState(patient.usState||'');
    const [zip, setZip] = useState(patient.zip||'');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validate, setValidate] = useState({});
    let pInfo={};
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "address"){
            setAddress(value);
        }
        if(id === "city"){
            setCity(value);
        }
        if(id === "zip"){
            setZip(value);
        }
        if(id === "referral"){
            setReferral(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
    }

    const changeUsState = (newUsState) => {
        setUsState(newUsState);
    }
    const handleSubmit  = () => {
        const validatePassword=(password&&password!==confirmPassword)?{ border:'2px solid #cc0000'}:{};
        setValidate({validatePassword});
        if(Object.keys(validatePassword).length!==0) {
            return;
        }
        
        pInfo={firstName:firstName,lastName:lastName,
            address:address,city:city,usState:usState,zip:zip,
            referral:referral,patientId:patient.patientId,
            rwuserId:patient.rwuserId
        };
        if(password) {
            pInfo.password=password;
        }
        
        patientSvc.updatePatient(patientId,pInfo).then((el)=>{
            console.log(el);
            props.onChangePatient(pInfo);
        });
    }

    return (
        <div className="form">
            <div className="form-body">
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="fname">First Name</label>
                  </div>
                  <div className="col-75">
                    <input type="text" id="firstName" name="firstName" value={firstName} placeholder="First name.." onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="lname">Last Name</label>
                  </div>
                  <div className="col-75">
                    <input type="text" id="lastName" name="lastName" placeholder="Last name.." value={lastName} onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="address">Address</label>
                  </div>
                  <div className="col-75">
                    <input type="text" id="address" name="address" placeholder="Address.." value={address} onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="city">City</label>
                  </div>
                  <div className="col-25">
                    <input type="text" id="city" name="city" placeholder="city.." value={city} onChange={handleInputChange}/>
                  </div>
                  <div className="col-12">
                    <label htmlFor="usState">State</label>
                  </div>
                  <div className="col-12">
                    <SelectUSState id="usState" value={usState} onChange={changeUsState}/>
                  </div>
                  <div className="col-12">
                    <label htmlFor="zip">Zip</label>
                  </div>
                  <div className="col-12">
                    <input type="text" id="zip" name="zip" placeholder="zip.." value={zip} onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="referral">Referral</label>
                  </div>
                  <div className="col-75">
                    <input type="text" id="referral" name="referral" placeholder="referral.." value={referral} onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="col-75">
                    <input type="password"  id="password" name="password" placeholder="Password.." onChange={handleInputChange} value={password} style={validate.validatePassword}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="confirmPassword">Confirm password</label>
                  </div>
                  <div className="col-75">
                    <input  type="password"  id="confirmPassword" name="confirmPassword" placeholder="Password.." onChange={handleInputChange}  value={confirmPassword} style={validate.validatePassword}/>
                  </div>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="btn">Update patient</button>
            </div>
        </div>

    );
};

export default UpdatePatient;
