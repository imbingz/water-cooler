import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import LandingNav from '../components/LandingNav';

function Landing() {
    return (
        <>
            <LandingNav />
            <Container>
                <Row className='d-flex justify-content-center mx-2'>
                    <div >
                        <video controls type="video/mp4" src='/assets/demo/temp-video.mp4' style={{width:'90vw', maxWidth: 750}}></video>
                    </div>
                </Row> 
                
                <Row>
                    <div>
                        <button> Try it Out</button>
                    </div>
                </Row> 
                <Row>
                </Row> 

            </ Container>
        </>
    );
}

export default Landing;
