import React, {useState} from 'react';
import { Navbar, Button} from 'react-bootstrap';
import LoginModal from '../../Modals/LoginModal';


function LandingNav() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Navbar sticky='top' 
                className="justify-content-around align-items-top bg-secondary"
            >
                <div>
                    <img style={{width: 40, height: 40}} src="/assets/images/logo-50.png" alt="water cooler logo"/>
                </div>
                <h2 style={{fontFamily:'Great Vibes'}} className='mb-0 pt-2'>Water Cooler</h2>
                <div>
                    <Button variant='warning'
                        size='sm'
                        className='px-3'
                        onClick={handleShow}
                    >
                        Login
                    </Button>
                </div>
                
            </Navbar>
            <LoginModal show={show} onHide={() => handleClose (false)} />
        </>
    );
}

export default LandingNav;
