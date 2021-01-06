import React from 'react';
import { Link } from 'react-router-dom';
import {useGlobalContext} from '../../utils/GlobalContext';
import {CgMenu} from 'react-icons/cg';
import {BsPeopleCircle} from 'react-icons/bs';
import { IconContext } from 'react-icons';
import './SideNav.css';
import NavSearch from '../NavSearch/NavSearch';

function SideNav() {

    // Slider setup
    const [{showAside}, dispatch] = useGlobalContext();
    const showSidebar = () => dispatch({type: 'setShowAside', payload: !showAside});

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
                        <button className='Header-logout-btn'onClick={() => {console.log('handleLogout');}}>Logout</button>
                    </div>
                </nav>
            </IconContext.Provider>
        </header>
    );
}

export default SideNav;
