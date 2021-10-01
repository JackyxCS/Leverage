import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import styles from './Dropdown.module.css';

function Dropdown() {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div onClick={openMenu}>Account
            {showMenu && (
                <div className={styles.dropdown}>
                    <div>
                        <NavLink className={styles.textdecoration} to='/profile'>
                            Profile
                        </NavLink>
                    </div>
                    <div>
                        <NavLink className={styles.textdecoration} to='/transfers'>
                            Transfers
                        </NavLink>
                    </div>
                    <div>
                        <LogoutButton />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dropdown