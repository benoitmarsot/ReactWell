import React, {useState,setState, useContext} from 'react';
import SelectUSState from 'react-select-us-states'
import providerSvc from '../services/provider.js';
import { ProviderContext } from '../App.jsx';

import './profile.css';

const Profile = (props) => {
    const {provider} = useContext(ProviderContext);
    const error=!provider?"No Provider":'';
    if(error) {
        return <div>{error}</div>;
    }
    const [firstName, setFirstName] = useState(provider.firstName);
    const [lastName, setLastName] = useState(provider.lastName);
    const [company, setCompany] = useState(provider.company);
    const [address, setAddress] = useState(provider.address);
    const [city, setCity] = useState(provider.city);
    const [usState, setUsState] = useState(provider.usState);
    const [zip, setZip] = useState(provider.zip);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [validate,setValidate] = useState({});
    let provInfo={};

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
        const validatePassword=(password&&password!==confirmPassword)?{ border:'2px solid #cc0000'}:{};
        setValidate({validatePassword});
        if(Object.keys(validatePassword).length!==0) {
            return;
        }
        provInfo={providerId:provider.providerId,firstName:firstName,lastName:lastName,company:company,address:address,city:city,usState:usState,zip:zip};
        if(password) {
            provInfo.password=password;
        }
        providerSvc.updateProvider(provInfo).then((el)=>{
            console.log("Updated provider id: ",el);
            //Update the provider with the new info using provInfo
            props.onChangeProvider(provInfo);
        }, (error) => {
            //set error and show below
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
                    <input type="text" id="firstName" name="firstName" placeholder="First name.." value={firstName} onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="lname">Last Name</label>
                  </div>
                  <div className="col-75">
                    <input type="text" id="lastName" name="lastName" placeholder="Last name.."  value={lastName} onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="company">Company (if any)</label>
                  </div>
                  <div className="col-75">
                    <input type="text" id="company" name="company" placeholder="company.."  value={company} onChange={handleInputChange}/>
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
                    <SelectUSState id="usState" values={usState} onChange={changeUsState}/>
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
                <button onClick={handleSubmit} type="submit" className="btn">Update profile</button>
            </div>
        </div>

    );
};

export default Profile;
