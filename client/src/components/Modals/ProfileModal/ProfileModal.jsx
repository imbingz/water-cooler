import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { GoMail } from 'react-icons/go';

function ProfileModal(props) {

    // * Set States, State Helper Functions, and Other Variables

    const { checkdb, friend } = props;
    const { _id } = JSON.parse(localStorage.getItem('USER'));
    // ** Used To Conditionally Render Unfriend Button
    const [isFriend, setIsFriend] = useState(true);
    // ** Store Unfriend Button jsx In State [ note: friend.friendId is undefined on first render ]
    const [friendButton, setFriendButton] = useState(
        <Button
            className='d-inline-block mx-2 px-3'
            variant='light'
            size='sm'
        >Unfriend</Button >
    );

    // * Functions
    // ** Send User and Friend's IDs to Server To Process Unfriending
    const unfriend = useCallback(async (id) => {
        console.log(friend.friendId);
        try {
            const request = await fetch('/api/friends/unfriend', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friend: id, user: _id }),
                method: 'PUT'
            });
            const status = await request.json();
            if (status.success) {
                toast.success('Removed As Friend', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (err) {
            console.log({ err });
        }
    }, [ friend.friendId, _id ]);


    // ** Manage Sending DM to Friend
    const sendMessage = () => {
        console.log('sendMessage will definitely do something eventually');
    };

    // * Listen To change of isFriend State. When True, friend.friendId will be defined
    //  // When False, Button Value will Change [ note: I need to find a way to set state back to true when the modal is closed, else all the friend's modals will show Removed ]
    useEffect(() => {
        
        if (!isFriend) {
            setFriendButton(
                <Button
                    onClick={e => {
                        e.preventDefault();
                    }}
                    className='d-inline-block mx-2 px-3'
                    variant='dark'
                    size='sm'
                >Removed</Button >
            );
            
        } else {
            setFriendButton(
                <Button
                    onClick={async (e) => {
                        e.preventDefault();
                        console.log(friend.friendId);
                        await unfriend(friend.friendId);
                        checkdb('friends');
                        // setIsFriend(false);
                    }}
                    className='d-inline-block mx-2 px-3'
                    variant='light'
                    size='sm'
                >Unfriend</Button >
            );
            
        }

    }, [checkdb, friend.friendId, isFriend, unfriend,]);

    return (
        <>
            <Modal {...props} backdrop="static" keyboard={false} centered>

                <Modal.Header closeButton>
                    <Modal.Title ></Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Container className='d-flex flex-column justify-content-center align-items-center mx-auto' style={{ backgroundColor: '#ddc9fc' }}>
                        <Row className='mt-5'>

                            <Col className='mt-1 mr-4' xs={3}>
                                <img src={friend.imageSrc} alt={friend.username} style={{ width: 75, height: 75, borderRadius: 50 }} />
                            </Col>

                            <Col className='ml-2' xs='auto'>
                                <Row className='d-flex flex-row justify-content-start'>
                                    <h6 className='pt-1'> {friend.firstName} </h6>
                                    <h6 className='pt-1 mx-2'>  {friend.lastName} </h6>
                                </Row>
                                <Row>
                                    <em className='mb-0 Profile-Modal-username' style={{ fontSize: '1rem', color: '#555' }}> {friend.username} </em>
                                </Row>
                                <Row>
                                    <i className='mr-2'><GoMail size={20} style={{ fill: 'blue' }} /></i>
                                    <em>
                                        <a href={`mailto: ${friend.email}`} style={{ fontSize: '1rem', color: '#555' }}>{friend.email}
                                        </a>
                                    </em>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='my-4'>
                            {/* Invite Button */}
                            <Button className='d-inline-block mx-2 px-3' size='sm' variant='success'>Invite</Button >
                            {/* Chat Button */}
                            <Button
                                onClick={e => {
                                    e.preventDefault();
                                    sendMessage();
                                }}
                                className='d-inline-block mx-2 px-3'
                                variant='warning'
                                size='sm'
                            >Chat</Button >
                            {/* Unfriend */}
                            {friendButton}
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer> </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProfileModal;
