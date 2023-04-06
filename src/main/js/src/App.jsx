import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index.jsx';
import About from './pages/about.jsx';
import CreatePatient from './pages/createPatient.jsx';
import AnnualReport from './pages/annual.jsx';
import Assesment from './pages/assesment.jsx';
import SelectPatient from './pages/selectPatient.jsx';
import Blogs from './pages/blogs.jsx';
import SignUp from './pages/signup.jsx';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/createpatient' element={<CreatePatient/>} />
                <Route path='/Assesment' element={<Assesment/>} />
                <Route path='/annual' element={<AnnualReport/>} />
                <Route path='/selectpatient' element={<SelectPatient/>} />
                <Route path='/blogs' element={<Blogs/>} />
                <Route path='/sign-up' element={<SignUp/>} />
            </Routes>
        </Router>
    );
}

export default App;
