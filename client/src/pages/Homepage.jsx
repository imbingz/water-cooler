
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import RoomCarousel from '../components/RoomCarousel';
import CreateRoom from '../components/CreateRoom';
import FriendsRoom from '../components/FriendsRoom';

const Homepage = () => {
    return (
        <main>
            <Container className='d-flex flex-column justify-content-end'>
                <Container className='mt-3 p-4' style={{backgroundColor: 'greenyellow'}}> 
                    <Row >
                        <Col className='text-center pb-2 mb-4'>
                            <h3>Create Room</h3>
                        </Col>
                    </Row>
                    
                    <Row className='d-flex justify-content-center mx-5'>

                        {/* RoomCarousel Component */}  

                        <Col xs={12} lg={5} md={6} className='pb-3' >       
                            <RoomCarousel />
                        </Col>
                        {/* CreateRoom Component */}          
                        <CreateRoom/>
                        
                    </Row>
                </Container>

                <Container className='my-5 p-3' style={{backgroundColor: '#0af'}}> 
                    <FriendsRoom/>
                </Container>
            </Container>
        </main>
    );
};

export default Homepage;