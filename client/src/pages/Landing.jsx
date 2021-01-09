import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LandingNav from '../components/LandingNav';
import SignupModal from '../components//Modals/SignupModal';
import './css/Landing.css';

function Landing() {

    const history = useHistory();
    const [showDemo, setShowDemo] = useState(true);
    //Signup Modal 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <LandingNav />
            <Container>
                <Row className='d-flex justify-content-center mx-2 my-4'>
                    
                    <div >
                        <h3 className='text-center text-muted py-3'>  A Space To Bound & Connect </h3>
                        { 
                            showDemo && 
                        <video controls type='video/mp4' src='/assets/demo/temp-video.mp4' style={{width:'90vw', maxWidth: 750}}> 
                        </video>
                        }

                    </div>
                   
                </Row> 
                
                <Row className='d-flex justify-content-center align-items-center mx-2 my-4'>

                    <button 
                        type='button' 
                        className='d-inline-block mx-5 my-5 px-3 py-2 Landing-btn'
                        // ***** need to chang the route to demo ****//
                        onClick={() => {setShowDemo(false); history.push('/room');}} 
                    >
                        Try it Out
                    </button>
                    <div className='mx-5'>
                        <img src='/sprites/rpg-nature-tileset/cafe.png' alt='GUI demo' style={{width:'90vw' , maxWidth: 576}}/>
                    </div>
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
                <SignupModal show={show} onHide={() => handleClose (false)} />        

                
            </ Container>
        </>
    );
}

export default Landing;
