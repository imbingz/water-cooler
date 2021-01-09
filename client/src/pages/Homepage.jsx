
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CreateRoom from '../components/HomepageComponents/CreateRoom';
import FriendsRoom from '../components/HomepageComponents/FriendsRoom';
import RoomCarousel from '../components/HomepageComponents/RoomCarousel';

const Homepage = () => {
    return (
       
        <Container fluid className='d-flex flex-column ml-auto'>
            <Container className='mt-3 p-4' style={{backgroundColor: 'greenyellow'}}>
                <Row >
                    <Col className='text-center pb-2 mb-4'>
                        <h3>Create A Room</h3>
                    </Col>
                </Row>
                    
                <Row className='d-flex justify-content-center mx-5'>
                        
                    {/* RoomCarousel Component */}    
                    <RoomCarousel />

                    {/* CreateRoom Component */}          
                    <CreateRoom/>
                        
                </Row>
            </Container>

            <Container className='my-5 p-3' style={{backgroundColor: '#0af'}}> 
                {/* FriendsRoom Component */}    
                <FriendsRoom/>
            </Container>
        </Container>
       
    );
};

export default Homepage;