import React, { useState } from 'react';
import { BsSearch, BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import SearchModal from '../Modals/SearchModal';
import './Footer.css';


function Footer() {

    // * For SearchModal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <footer>
            <Navbar bg='secondary' fixed='bottom' className="Footer justify-content-around">
                <div>
                    <i onClick={handleShow} >
                        < BsSearch size={23} style={{ fill: 'white' }} className='Footer-icon' />
                    </i>
                </div>
                <a style={{ fontFamily: 'Great Vibes' }} className='Header-title' href="/">
                    <img style={{ width: 36, height: 36 }} src="/assets/images/logo-50.png" alt="water cooler logo" />
                </a>
                <div> <Link to="/profile">< BsFillPersonFill size={28} style={{ fill: 'white' }} /></Link></div>
            </Navbar>
            <SearchModal show={show} onHide={() => handleClose(false)} />
        </footer>
    );
}

export default Footer;
