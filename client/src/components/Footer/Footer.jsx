import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar} from 'react-bootstrap';
import { BsSearch, BsFillPersonFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';


function Footer() {
    return (
        <footer>
            <Navbar bg='dark' fixed='bottom' className="Footer justify-content-around">
                <div><Link>< BsSearch size={ 25 } style={ { fill: 'white' } } /></Link></div>
                <div> <Link to="/">< AiFillHome size={ 30 } style={ { fill: 'white' } }/> </Link></div>
                <div> <Link to="/profile">< BsFillPersonFill size={ 30 } style={ { fill: 'white' } } /></Link></div>
            </Navbar>
        </footer>
    );
}

export default Footer;
