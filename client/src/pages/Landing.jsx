import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';
import LandingNav from '../components/LandingNav';
import SignupModal from '../components//Modals/SignupModal';
import './css/Landing.css';

function Landing() {

    // const history = useHistory();
    // const [showDemo, setShowDemo] = useState(true);
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
                        
                        {/* <video autoplay controls type='video/mp4' src='/assets/demo/landing.mp4' style={{width:'90vw', maxWidth: 950}}> 
                        </video> */}
                      
                        <img src="/assets/demo/landing.gif" alt="demo" style={{width:'90vw', maxWidth: 950}}/>

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

                <Row className='d-flex justify-content-center align-items-center mx-2 my-4'>

                    {/* <button 
                        type='button' 
                        className='d-inline-block mx-5 my-5 px-3 py-2 Landing-btn'
                       
                        onClick={() => {setShowDemo(false); history.push('/room');}} 
                    >
                        Try it Out
                    </button> */}
                    <div className='mx-5'>
                        <img src='/assets/images/2.png' alt='people-gathering-around-watercooler' style={{width:'80vw' , maxWidth: 500}}/>
                    </div>
                </Row> 

                <SignupModal show={show} onHide={() => handleClose (false)} />        

                
            </ Container>
        </>
    );
}

export default Landing;
