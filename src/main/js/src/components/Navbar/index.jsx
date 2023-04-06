import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
    return (
	<>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to='/about' activestyle="true">
                        About
                    </NavLink>
                    <NavLink to='/createpatient' activestyle="true">
                        Register patient
                    </NavLink>
                    <NavLink to='/selectpatient' activestyle="true">
                        Select patient
                    </NavLink>
                    <NavLink to='/Assesment' activestyle="true">
                        Assesment
                    </NavLink>
                    <NavLink to='/blogs' activestyle="true">
                        Blogs
                    </NavLink>
                    <NavLink to='/sign-up' activestyle="true">
                        Sign Up
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
	</>
    );
};

export default Navbar;
