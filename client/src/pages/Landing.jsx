import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import LandingNav from '../components/LandingPageComponents/LandingNav';
import SignupModal from '../components//Modals/SignupModal';
import LandingCarousel from '../components/LandingPageComponents/LandingCarousel';
import './css/Landing.css';

function Landing() {
    //Signup Modal 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <LandingNav />

            <Container className=' px-5'>
                
                <Row className='d-flex justify-content-center my-4'>             
                    <h3 className='text-center text-muted py-3'>  A Space To Bound & Connect </h3>
                      
                    <img src="/assets/images/landingimg/landing.gif" alt="demo" style={{width:'85%', maxWidth: 950}}/>               
                </Row> 
                
                
                <Row className='my-5 d-flex justify-content-center align-item-center'>
                    <div >
                        <button 
                            type='button' 
                            className='d-inline-block mx-5 my-5 px-4 py-3 Landing-btn Landing-start-btn'
                            onClick={() => 
                            { 
                                handleShow();
                            }}
                        >
                        Get Started
                        </button>
                    </div>
                </Row> 

                <Row className='d-flex justify-content-center mx-2 my-4'>

                    <LandingCarousel />
                </Row> 

                <SignupModal show={show} onHide={() => handleClose (false)} />        

                
            </ Container>
        </>
    );
}

export default Landing;
