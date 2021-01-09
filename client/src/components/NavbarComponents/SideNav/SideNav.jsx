import React from 'react';
import { BsPeopleCircle } from 'react-icons/bs';
import { CgMenu } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import { Link, useHistory } from 'react-router-dom';
import NavSearch from '../NavSearch/NavSearch';
import { useGlobalContext } from '../../../utils/GlobalContext';
import './SideNav.css';

function SideNav() {

    // Slider setup
    const [{showAside}, dispatch] = useGlobalContext();
    const showSidebar = () => dispatch({type: 'setShowAside', payload: !showAside});

    //Logout logic
    const history = useHistory();
    const handleLogout = async () => {
        try {
            const response = await fetch('api/user/logout');

            const data = await response.json();

            console.log(data);
            // useGlobal Context
            if (data.success) {
                localStorage.removeItem('USER');
                history.push('/');
            }

        } catch (err) {
            console.error(err);
        }
    };


    return (
        <header>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className='Header-navbar'>
                    <div className='Header-left'>
                        <Link to='/profile' className='Header-profile-icon'>
                            <BsPeopleCircle />
                        </Link>
                        <Link to='#' className='Header-menu-bars'>
                            <CgMenu onClick={showSidebar} />
                        </Link>
                    </div>
                    <NavSearch />
                    <div className='Header-right'>
                        <button className='Header-logout-btn'onClick={() => handleLogout()}>Logout</button>
                    </div>
                </nav>
            </IconContext.Provider>
        </header>
    );
}

export default SideNav;
