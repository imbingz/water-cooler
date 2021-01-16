import React from 'react';
import { Modal, Container, Row, Button, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {GoMail} from 'react-icons/go';

function TabMembersProfileModal(props) {

    const path = window.location.pathname;
    let spaceId = false;
    if (path.length > 70) {
        spaceId = path.substring(44);
    }

    const sendSpaceInvite = async (friendId) => {
        const request = await fetch('/api/socialspace/invite', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spaceId: spaceId, friendId: friendId }),
            method: 'PUT'
        });
        const response = await request.json();
        if (response.success) {
            toast.success('Sent Social Space Invite!', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error('Failed to Send Social Space Invite', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const {member} = props;
    // console.log(member);
    return (
        <>
            <Modal {...props} backdrop="static" keyboard={false} centered>

                <Modal.Header closeButton>
                    <Modal.Title ></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                                    
                    <Container className='d-flex flex-column justify-content-center align-items-center mx-auto' style={{backgroundColor: '#c9f0fc'}}>
                        <Row className='mt-5'>
                      
                            <Col className='mt-1 mr-4' xs={3}>
                                <img src={member.imageSrc} alt={member.username} style={{width: 75, height: 75, borderRadius:50}}/>
                            </Col>
                     
                            <Col className='ml-2' xs='auto'>
                                <Row className='d-flex flex-row justify-content-start'>
                                    <h6 className='pt-1'> {member.firstName} </h6>      
                                    <h6 className='pt-1 mx-2'>  {member.lastName} </h6> 
                                </Row>
                                <Row>
                                    <em className='mb-0 Profile-Modal-username' style={{fontSize: '1rem', color: '#555'}}> {member.username} </em>
                                </Row>
                                <Row>
                                    <i className='mr-2'><GoMail size={20} style={ { fill: 'blue' } }/></i>
                                    <em>
                                        <a href = {`mailto: ${member.email}`} style={{fontSize: '1rem', color: '#555'}}>{member.email}
                                        </a>
                                    </em>
                                </Row> 
                            </Col>
                        </Row>            
                        <Row className='my-4'>
                            {spaceId &&
                                <Button 
                                    onClick={() => { sendSpaceInvite(member.friendId); }}
                                    className='d-inline-block mx-2 px-3'
                                    variant='success'
                                >Invite to SocialSpace</Button >
                            }
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
