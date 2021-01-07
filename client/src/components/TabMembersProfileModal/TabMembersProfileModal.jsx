import React from 'react';
import { Modal, Container, Row, Button, Col } from 'react-bootstrap';
import {GoMail} from 'react-icons/go';

function TabMembersProfileModal(props) {

    const {roomMember} = props;
    return (
        <>
            <Modal {...props} backdrop="static" keyboard={false} centered>

                <Modal.Header closeButton>
                    <Modal.Title ></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                                    
                    <Container className='d-flex flex-column justify-content-center align-items-center mx-auto' style={{backgroundColor: '#ddc9fc'}}>
                        <Row className='mt-5'>
                      
                            <Col className='mt-1 mr-4' xs={3}>
                                <img src={roomMember.imageSrc} alt={roomMember.username} style={{width: 75, height: 75, borderRadius:50}}/>
                            </Col>
                     
                            <Col className='ml-2' xs='auto'>
                                <Row className='d-flex flex-row justify-content-start'>
                                    <h6 className='pt-1'> {roomMember.firstName} </h6>      
                                    <h6 className='pt-1 mx-2'>  {roomMember.lastName} </h6> 
                                </Row>
                                <Row>
                                    <em className='mb-0 Profile-Modal-username' style={{fontSize: '1rem', color: '#555'}}> {roomMember.username} </em>
                                </Row>
                                <Row>
                                    <i className='mr-2'><GoMail size={20} style={ { fill: 'blue' } }/></i>
                                    <em>
                                        <a href = {`mailto: ${roomMember.email}`} style={{fontSize: '1rem', color: '#555'}}>{roomMember.email}
                                        </a>
                                    </em>
                                </Row> 
                            </Col>
                        </Row>            
                        <Row className='my-4'>
                            <Button className='d-inline-block mx-2 px-3' sizee='sm' variant='success'>Invite to SocialSpace</Button >
                            <Button className='d-inline-block mx-2 px-3' variant='warning' size='sm'>DM Chat</Button >
                            <Button className='d-inline-block mx-2 px-3' variant='light' size='sm'>Unfriend</Button >
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer> </Modal.Footer>
            </Modal>
        </>
    );
}

export default TabMembersProfileModal;
