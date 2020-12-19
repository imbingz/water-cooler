import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="Navbar">
            <div className="Navbar-brand">
                <span>Water Cooler</span>
            </div>

            <ul className="Navbar-links">
                <li className="Navbar-link">
                    <Link to="/">
                        Homepage
                    </Link>
                </li>

                <li className="Navbar-link">
                    <Link to="/signup">
                        Signup
                    </Link>
                </li>

                <li className="Navbar-link">
                    <Link to="/login">
                        Login
                    </Link>
                </li>

                <li className="Navbar-link">
                    <Link to="/search">
                        Search
                    </Link>
                </li>

                <li className="Navbar-link">
                    <Link to="/profile">
                        Profile
                    </Link>
                </li>

                <li className="Navbar-link">
                    <Link to="/rooms">
                        Rooms
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
