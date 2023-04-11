import React, { useState, setState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/index.jsx';
import About from './pages/about.jsx';
import CreatePatient from './pages/createPatient.jsx';
import AnnualReport from './pages/annual.jsx';
import Assesment from './pages/assessment.jsx';
import SelectPatient from './pages/selectPatient.jsx';
import Blogs from './pages/blogs.jsx';
import SignUp from './pages/signup.jsx';
import SignIn from './pages/signin.jsx';

function App() {
    const [provider, setProvider] = useState(null);
    const [patientId, setPatientId] = useState(null);
    const changePatient=(event) => {
        if(event) {
            setPatientId(event);
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
    return (
        <Router>
            <Navbar  patientid={patientId} providerid={providerId} />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/createpatient' element={<CreatePatient onChangePatient={changePatient} providerid={providerId} />} />
                <Route path='/Assesment' element={<Assesment providerid={providerId} patientid={patientId} />} />
                <Route path='/annual' element={<AnnualReport/>} />
                <Route path='/selectpatient' element={<SelectPatient onChangePatient={changePatient} provider={provider} patientid={patientId} />} />
                <Route path='/blogs' element={<Blogs/>} />
                <Route path='/sign-up' element={<SignUp onChangeProvider={changeProvider} />} />
                <Route path='/signin' element={<SignIn onChangeProvider={changeProvider} />} />
            </Routes>
        </Router>
    );
}

export default App;
