import React, { useState, setState, useEffect, createContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/index.jsx';
import About from './pages/about.jsx';
import CreatePatient from './pages/createPatient.jsx';
import UpdatePatient from './pages/updatePatient.jsx';
import Assesment from './pages/assessment.jsx';
import SelectPatient from './pages/selectPatient.jsx';
import SelectProvider from './pages/selectProvider.jsx';
import Profile from './pages/profile.jsx';
import SignUp from './pages/signup.jsx';
import SignIn from './pages/signIn.jsx';
import SignInPatient from './pages/signInPatient.jsx';
import SignOut from './pages/signout.jsx';

const ProviderContext = createContext(null);
const PatientContext = createContext(null);

function App() {
    const [provider, setProvider] = useState(null);
    const [patient, setPatient] = useState(null);
    const [isPatientPortal, setIsPatientPortal] = useState(false);

    const changePatient=(newPatient) => {
        if(newPatient) {
            setPatient(newPatient);
            console.log("changePatient: ",newPatient);
        }
    }
    const setPatientPortal=(newIsPatientPortal) => {
        setIsPatientPortal(newIsPatientPortal);
    }
    const changeProvider = (newProvider) => {
        setProvider(newProvider);
        console.log("changeProvider: ", newProvider);
        
    }
    const signOut = () => {
        setProvider(null);
        setPatient(null);
    }
    const providerId=(provider)?provider.providerId:0;
    const patientId=(patient)?patient.patientId:0;
    return (
        <ProviderContext.Provider value={{provider,setProvider}}>
            <PatientContext.Provider value={{patient,setPatient}}>
                <Router basename="">
                    <Navbar  patientid={patientId} providerid={providerId} isPatientPortal={isPatientPortal}/>
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/about' element={<About/>} />
                        <Route path='/createpatient' element={<CreatePatient onChangePatient={changePatient} providerid={providerId} />} />
                        <Route path='/updatepatient' element={<UpdatePatient onChangePatient={changePatient} providerid={providerId} patientid={patientId} />} /> //useContext(PatientContext)
                        <Route path='/Assesment' element={<Assesment providerid={providerId} patientid={patientId} isPatientPortal={isPatientPortal} />} />
                        <Route path='/selectpatient' element={<SelectPatient onChangePatient={changePatient} patientid={patientId} />} /> //useContext(ProviderContext)
                        <Route path='/selectprovider' element={<SelectProvider onChangeProvider={changeProvider} providerid={providerId} />} /> //useContext(PatientContext)
                        <Route path='/profile' element={<Profile onChangeProvider={changeProvider} />} />  //useContext(ProviderContext)
                        <Route path='/sign-up' element={<SignUp onChangeProvider={changeProvider} />} />
                        <Route path='/signin' element={<SignIn onChangeProvider={changeProvider} />} />
                        <Route path='/signinpatient' element={<SignInPatient onSetPatientPortal={setPatientPortal} onChangePatient={changePatient}/>} />
                        <Route path='/signout' element={<SignOut onSignOut={signOut} />} />
                    </Routes>
                </Router>
            </PatientContext.Provider>
        </ProviderContext.Provider>
    );
}
export {App,ProviderContext,PatientContext};
