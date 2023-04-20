import { useEffect, useState, React} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';

const Navbar = (props) => {
	const providerId=props.providerid;
	const patientId=props.patientid;
	
    return (
		<>
			<Nav>
				<Bars />
				<NavMenu>
					<NavLink to='/about' activestyle="true">
						About
					</NavLink>
					{providerId? (
						<>
							<NavLink to='/createpatient' activestyle="true">
								Register patient
							</NavLink>
							<NavLink to='/selectpatient' activestyle="true">
								Select patient
							</NavLink>
							{patientId? ( <>
								<NavLink to='/updatepatient' activestyle="true">
									Update patient
								</NavLink>
								<NavLink to='/assesment' activestyle="true">
									Assesment
								</NavLink>
							</>):''}
							<NavLink to='/profile' activestyle="true">
								Profile
							</NavLink>
						</>
						):''
					}
					<NavLink to='/sign-up' activestyle="true">
						Sign Up
					</NavLink>
				</NavMenu>
				<NavBtn>
					<NavBtnLink to='/signin'>Sign In</NavBtnLink>
				</NavBtn>
			</Nav>
		</>
    );
};

export default Navbar;
