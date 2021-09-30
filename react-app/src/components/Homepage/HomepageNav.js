import React from 'react';
import { NavLink } from 'react-router-dom';
import AboutMeModal from '../AboutMeModal';
import './HomepageNav.css'

const HomepageNav = () => {
    return (
        <div className="HomepageNavbar">
            <div className="Bar">
                <div className="Logo">
                    <NavLink className="HomepageNavIcon" to='/' exact={true}>
                        LEVERAGE
                    </NavLink>
                </div>
                <div className="Homepage-selection">
                    <div className="About-me-modal">
                        <AboutMeModal />
                    </div>
                    <div className="Login-span">
                        <NavLink className="Login-navlink" to='/login' exact={true}>
                            <span className="Login-text">Login</span>
                        </NavLink>
                    </div>
                    <div className="Signup-span">
                        <NavLink className="Signup-navlink" to='/signup' exact={true}>
                            <span className="Signup-text">Sign Up</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomepageNav;