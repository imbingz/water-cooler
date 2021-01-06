import React from 'react';
import { Modal, Container, Row, Button, Col } from 'react-bootstrap';
import {GoMail} from 'react-icons/go';

function ProfileModal(props) {
    const {friend} = props;
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
                                <img src={friend.imageSrc} alt={friend.username} style={{width: 75, height: 75, borderRadius:50}}/>
                            </Col>
                     
                            <Col className='ml-2' xs='auto'>
                                <Row className='d-flex flex-row justify-content-start'>
                                    <h6 className='pt-1'> {friend.firstName} </h6>      
                                    <h6 className='pt-1 mx-2'>  {friend.lastName} </h6> 
                                </Row>
                                <Row>
                                    <em className='mb-0 Profile-Modal-username' style={{fontSize: '1rem', color: '#555'}}> {friend.username} </em>
                                </Row>
                                <Row>
                                    <i className='mr-2'><GoMail size={20} style={ { fill: 'blue' } }/></i>
                                    <em>
                                        <a href = {`mailto: ${friend.email}`} style={{fontSize: '1rem', color: '#555'}}>{friend.email}
                                        </a>
                                    </em>
                                </Row> 
                            </Col>
                        </Row>            
                        <Row className='my-4'>
                            <Button className='d-inline-block mx-2 px-3' variant='danger' size='sm'>Block</Button >
                            <Button className='d-inline-block mx-2 px-3' sizee='sm' variant='success'>Invite</Button >
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer> </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProfileModal;
