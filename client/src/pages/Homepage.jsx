
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const Homepage = () => {
    return (
        <main>
            <Container className='d-flex flex-column justify-content-end'>
                <Row>
                    <Col className='Home-room-header'>
                        <h3>Create Room</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={4}>
                        <h3>carousel of Room Options</h3>
                    </Col>
                    <Col xs={12} md='auto'>
                    
                        <Row>
                            room row
                        </Row>
                        <Row>
                            friends row 
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={4}>
                        <h3>Friends Room Card 1</h3>
                    </Col>
                    <Col xs={12} lg={4}>
                        <h3>Friends Room Card 2</h3>
                    </Col>
                    <Col xs={12} lg={4}>
                        <h3>Friends Room Card 3</h3>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default Homepage;