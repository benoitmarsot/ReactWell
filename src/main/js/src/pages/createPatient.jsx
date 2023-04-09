import React, {useState,setState} from 'react';
import SelectUSState from 'react-select-us-states'
import patientSvc from '../services/patient.js';

import './CreatePatient.css';

const CreatePatient = (props) => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [referral, setReferral] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [usState, setUsState] = useState(null);
    const [zip, setZip] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [validate, setValidate] = useState({});

    if(!props.providerid) {
        return <div>Error: no provider</div>
    }
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
        if(id === "email"){
            setEmail(value);
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
    const changePatient=props.onChangePatient;

    const handleSubmit  = () => {
        const validatePassword=(!password||password!==confirmPassword)?{ border:'2px solid #cc0000'}:{};
        const  validateEmail=(!email)?{ border:'2px solid #cc0000'}:{};
        setValidate({validatePassword,validateEmail});
        if(Object.keys(validatePassword).length!==0||Object.keys(validatePassword).length!==0) {
            return;
        }
        const handleChange = (event) => {
            changePatient(event.target.value);
        };
        const pInfo={firstName:firstName,lastName:lastName,
            address:address,city:city,usState:usState,zip:zip,
            referral:referral,email:email,password:password
        };
        
        patientSvc.register(props.providerid,pInfo).then((el)=>{
            console.log(el);
            changePatient(el);
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
                    <input type="text" id="firstName" name="firstName" placeholder="First name.." onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="lname">Last Name</label>
                  </div>
                  <div className="col-75">
                    <input type="text" id="lastName" name="lastName" placeholder="Last name.." onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="address">Address</label>
                  </div>
                  <div className="col-75">
                    <input type="text" id="address" name="address" placeholder="Address.." onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="city">City</label>
                  </div>
                  <div className="col-25">
                    <input type="text" id="city" name="city" placeholder="city.." onChange={handleInputChange}/>
                  </div>
                  <div className="col-12">
                    <label htmlFor="usState">State</label>
                  </div>
                  <div className="col-12">
                    <SelectUSState id="usState" onChange={changeUsState}/>
                  </div>
                  <div className="col-12">
                    <label htmlFor="zip">Zip</label>
                  </div>
                  <div className="col-12">
                    <input type="text" id="zip" name="zip" placeholder="zip.." onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="referral">Referral</label>
                  </div>
                  <div className="col-75">
                    <input type="text" id="referral" name="referral" placeholder="referral.." onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="col-75">
                    <input type="text" id="email" name="email" placeholder="email.." onChange={handleInputChange} style={validate.validateEmail}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="col-75">
                    <input type="password"  id="password" name="password" placeholder="Password.." onChange={handleInputChange}  style={validate.validatePassword}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="confirmPassword">Confirm password</label>
                  </div>
                  <div className="col-75">
                    <input  type="password"  id="confirmPassword" name="confirmPassword" placeholder="Password.." onChange={handleInputChange} style={validate.validatePassword}/>
                  </div>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="btn">Register</button>
            </div>
        </div>

    );
};

export default CreatePatient;
