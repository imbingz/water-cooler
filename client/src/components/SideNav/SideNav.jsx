import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {CgMenu} from 'react-icons/cg';
import {AiOutlineClose} from 'react-icons/ai';
import {BsPeopleCircle, BsSearch} from 'react-icons/bs';
import { IconContext } from 'react-icons';
import Tabnav from '../Tabnav';
import './SideNav.css';

// import { Nav, Navbar } from 'react-bootstrap';

function SideNav() {
    const [sidebar, setSidebar] = useState(true);

    const showSidebar = () => setSidebar(!sidebar);

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
                    <div className='Header-search'>
                        <form onSubmit={(e) => {e.preventDefault(); console.log('handleSearch');}}>
                            <i> < BsSearch size={ 20 } style={ { fill: 'black' } } /></i>
                            <label htmlFor='search'></label>
                            <input id='search' name='search' placeholder='Search Friends...' type="text"/>
                        </form>
                    </div>
                    <div className='Header-right'>
                        <button className='Header-logout-btn'onClick={() => {console.log('handleLogout');}}>Logout</button>
                    </div>
                </nav>
                
                <aside className={sidebar ? 'Sidenav-menu active' : 'Sidenav-menu'}>
                    <div className='Sidenav-menu-items d-flex flex-column' >
                        <div onClick={showSidebar}className='Sidenav-toggle' >
                            <Link to='#' className='Header-menu-bars'>
                                <AiOutlineClose />
                            </Link>
                        </div>
                        <Tabnav />
                    </div>
                    
                </aside>
            </IconContext.Provider>
        </header>
    );
}

export default SideNav;
