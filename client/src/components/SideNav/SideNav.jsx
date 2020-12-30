import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {CgMenu} from 'react-icons/cg';
import {AiOutlineClose} from 'react-icons/ai';
import {BsPeopleCircle, BsSearch} from 'react-icons/bs';
import { IconContext } from 'react-icons';
import './SideNav.css';

// import { Nav, Navbar } from 'react-bootstrap';

function SideNav() {
    const [sidebar, setSidebar] = useState(true);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <header>
            <IconContext.Provider value={{ color: '#fff' }}>
                {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    
                    <Link to='/profile' className='menu-bars'>
                        <BsPeopleCircle />
                    </Link>
                    <Link to='#' className='menu-bars'>
                        <CgMenu onClick={showSidebar} />
                    </Link>
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link className="ml-auto" href="#features">Profile Icon</Nav.Link>
                            <Nav.Link className="ml-auto" href="#pricing">Logout</Nav.Link>
                        
                        </Nav>
                    </Navbar.Collapse>
                </Navbar> */}
              
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
                    <ul className='Sidenav-menu-items' >
                        <li className='Sidenav-toggle' onClick={showSidebar}>
                            <Link to='#' className='Header-menu-bars'>
                                <AiOutlineClose />
                            </Link>
                        </li>
                    </ul>
                </aside>
            </IconContext.Provider>
        </header>
    );
}

export default SideNav;
