import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const history = useHistory();
    const [isLogged, setIsLogged] = useState(true); 


    const handleLogout = async () => {
        console.log('logout clicked');
        try {
            const response = await fetch('api/user/logout');

            const data = await response.json();

            console.log(data);

            if (data.success) {
                localStorage.removeItem('USER');
                setIsLogged(false);
                alert('Successfully logged out!');
                history.push('/');
            }

        } catch (err) {
            console.error(err);
        }
    };

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
                <li className="Navbar-link">
                    <Link to="/game">
                        GameRPG
                    </Link>
                </li>
                {
                    isLogged && 
                    <li className="Navbar-link" onClick={() => handleLogout()}>          
                            Logout
                    </li>
                }
            </ul>
        </nav>
    );
};

export default Navbar;
