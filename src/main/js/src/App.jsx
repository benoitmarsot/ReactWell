import React, { useState, setState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/index.jsx';
import About from './pages/about.jsx';
import CreatePatient from './pages/createPatient.jsx';
import UpdatePatient from './pages/updatePatient.jsx';
import Assesment from './pages/assessment.jsx';
import SelectPatient from './pages/selectPatient.jsx';
import Profile from './pages/profile.jsx';
import SignUp from './pages/signup.jsx';
import SignIn from './pages/signin.jsx';

function App() {
    const [provider, setProvider] = useState(0);
    const [patient, setPatient] = useState(0);
    const changePatient=(event) => {
        if(event) {
            setPatient(event);
            console.log("changePatient: ",event);
        }
    }
    const changeProvider=(event) => {
        setProvider(event);
        console.log("changeProvider: ",event);
        if(event.patients) {
            //no provider the
          //   useEffect(() => {
          //       window.location = '/selectpatient';
          // }, []);
        } else {
          //   useEffect(() => {
          //        window.location = '/selectpatient';
          // }, []);
        }
    }
    const providerId=(provider)?provider.providerId:0;
    const patientId=(patient)?patient.patientId:0;
    return (
        <Router>
            <Navbar  patientid={patientId} providerid={providerId} />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/createpatient' element={<CreatePatient onChangePatient={changePatient} providerid={providerId} />} />
                <Route path='/updatepatient' element={<UpdatePatient onChangePatient={changePatient} providerid={providerId} patient={patient} />} />
                <Route path='/Assesment' element={<Assesment providerid={providerId} patientid={patientId} />} />
                <Route path='/selectpatient' element={<SelectPatient onChangePatient={changePatient} provider={provider} patientid={patientId} />} />
                <Route path='/profile' element={<Profile provider={provider} />} />
                <Route path='/sign-up' element={<SignUp onChangeProvider={changeProvider} />} />
                <Route path='/signin' element={<SignIn onChangeProvider={changeProvider} />} />
            </Routes>
        </Router>
    );
}

export default App;
