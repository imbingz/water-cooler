import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Navbar} from 'react-bootstrap';
import { BsSearch, BsFillPersonFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import SearchModal from '../SearchModal/SearchModal';


function Footer() {


    //For SearchModal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <footer>
            <Navbar bg='dark' fixed='bottom' className="Footer justify-content-around">
                <div>
                    <i onClick={handleShow} >
                        < BsSearch size={ 25 } style={ { fill: 'white' } } />
                    </i>
                </div>
                <div> <Link to="/">< AiFillHome size={ 30 } style={ { fill: 'white' } }/> </Link></div>
                <div> <Link to="/profile">< BsFillPersonFill size={ 30 } style={ { fill: 'white' } } /></Link></div>
            </Navbar>
            <SearchModal show={show} onHide={() => handleClose (false)} />
        </footer>
    );
}

export default Footer;
