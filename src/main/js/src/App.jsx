import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index.jsx';
import About from './pages/about.jsx';
import Events from './pages/events.jsx';
import AnnualReport from './pages/annual.jsx';
import Assesment from './pages/Assesment.jsx';
import Teams from './pages/team.jsx';
import Blogs from './pages/blogs.jsx';
import SignUp from './pages/signup.jsx';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/events' element={<Events/>} />
                <Route path='/Assesment' element={<Assesment/>} />
                <Route path='/annual' element={<AnnualReport/>} />
                <Route path='/team' element={<Teams/>} />
                <Route path='/blogs' element={<Blogs/>} />
                <Route path='/sign-up' element={<SignUp/>} />
            </Routes>
        </Router>
    );
}

export default App;
