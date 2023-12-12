import React, {useState,setState} from 'react';
import {useNavigate} from 'react-router-dom';
import SelectUSState from 'react-select-us-states'
import providerSvc from '../services/provider.js';

import './signup.css';

const SignUp = () => {
    const navigate=useNavigate();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [company, setCompany] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [usState, setUsState] = useState(null);
    const [zip, setZip] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [validate,setValidate] = useState({});

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "company"){
            setCompany(value);
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
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
    };

    const changeUsState = (newUsState) => {
        setUsState(newUsState);
    };

    const handleSubmit  = () => {
        const validatePassword=(!password||password!==confirmPassword)?{ border:'2px solid #cc0000'}:{};
        const  validateEmail=(!email)?{ border:'2px solid #cc0000'}:{};
        setValidate({validatePassword,validateEmail});
        if(Object.keys(validatePassword).length!==0||Object.keys(validateEmail).length!==0) {
            return;
        }
        const provInfo={firstName:firstName,lastName:lastName,company:company,address:address,city:city,usState:usState,zip:zip, email:email,password:password};
        providerSvc.register(provInfo).then((el)=>{
            console.log("Registered new provider id: ",el);
            return navigate('/signin');
        }, (error) => {
            return <div>{error.error}</div>;
        });
    };

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
                    <label htmlFor="company">Company (if any)</label>
                  </div>
                  <div className="col-75">
                    <input type="text" id="company" name="company" placeholder="company.." onChange={handleInputChange}/>
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

export default SignUp;
