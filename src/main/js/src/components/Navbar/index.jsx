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
	const isPatientPortal=props.isPatientPortal;
    return (
		<>
			<Nav>
				<Bars />
				<NavMenu>
					<NavLink to='/about' activestyle="true">
						About
					</NavLink>
					{!isPatientPortal ? (
						providerId ? (
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
						):(
							<NavLink to='/sign-up' activestyle="true">
								Sign Up
							</NavLink>
							)
					):(
						patientId? (
							<>
								<NavLink to='/assesment' activestyle="true">
									Assesment
								</NavLink>
								<NavLink to='/updatepatient' activestyle="true">
									Profile
								</NavLink>
								<NavLink to='/selectprovider' activestyle="true">
									Select provider
								</NavLink>
							</>
						):""
					)}
				</NavMenu>
				{(providerId||patientId)? (
					<>
						<NavBtn>
							<NavBtnLink to='/signout'>Sign Out</NavBtnLink>
						</NavBtn>
					</>
				):(
					<>
						<NavBtn>
							<NavBtnLink to='/signin'>Sign In</NavBtnLink>
						</NavBtn>
						<NavBtn>
							<NavBtnLink to='/signinpatient'>Patient portal</NavBtnLink>
						</NavBtn>
					</>
				)}
			</Nav>
		</>
    );
};

export default Navbar;
