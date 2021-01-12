import React from 'react';
import { CgMenu } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import { Link, useHistory } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
// import NavSearch from '../NavSearch/NavSearch';
import { useGlobalContext } from '../../../utils/GlobalContext';
import './SideNav.css';

function SideNav() {

    // Slider setup
    const [{ showAside }, dispatch] = useGlobalContext();
    const showSidebar = () => dispatch({ type: 'setShowAside', payload: !showAside });

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
                //Set global USER to null upon logout
                dispatch({type: 'setUser', payload: null});
                //redirect back to non-authenticated landing page
                history.push('/');
            }

        } catch (err) {
            console.error(err);
        }
    };


    return (
        <header>
            <IconContext.Provider value={{ color: '#fff' }}>
                {/* !* Stick='top' caused the sidebar to render underneath the header */}
                <Navbar sticky=''
                    className="justify-content-between align-items-top bg-secondary"
                >
                    <div className=''>
                        {/* <Link to='/profile' className='Header-profile-icon'>
                            <BsPeopleCircle />
                        </Link> */}
                        <Link to='#' className='Header-menu-bars'>
                            <CgMenu onClick={showSidebar} />
                        </Link>
                    </div>
                    <a style={{ fontFamily: 'Great Vibes' }} className='Header-title' href="/">
                        Water Cooler
                    </a>

                    <div className=''>
                        <button className='Header-logout-btn' onClick={() => handleLogout()}>Logout</button>
                    </div>
                </Navbar>
            </IconContext.Provider>
        </header>
    );
}

export default SideNav;
