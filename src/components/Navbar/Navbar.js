import React, { useState } from 'react';
import { MenuItems } from "./MenuItems";
// import { Button } from '../Button'
import './Navbar.css'

const Navbar = ({ setPageVisible }) => {
    const [clicked, setClicked] = useState();

    const handleClick = () => {
        setClicked(!clicked)
    }

    return (
        <nav className="NavbarItems">
            <h1 className="navbar-logo">React<i className="fab fa-react"></i></h1>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url} onClick={() => setPageVisible(item)}>
                                {item.title}
                            </a>
                        </li>
                    )
                })}
            </ul>
            {/* <Button buttonSize="btn--medium">Sign Up</Button> */}
        </nav >
    )
}

export default Navbar;