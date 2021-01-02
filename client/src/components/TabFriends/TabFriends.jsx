import React, {useState} from 'react';
import './TabFriends.css';
import { Modal, Button } from 'react-bootstrap';
import friends from '../../data/friends';
import friendsRoom from '../../data/friendsRoom';
import {v4 as uuidv4} from 'uuid';


function TabFriends() {

    // Modal for friend's Profile
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='mx-3 mt-3'>
            <div className='d-flex justify-content-start'>
                <h6 className='mr-5 Tabfriends-subtitle'>Invitations:</h6> 
                <small className='ml-5 text-success '>Accept</small>  
                <small className='ml-4 text-danger'>Decline</small>  
            </div>
                
            <section className='d-flex flex-column justify-content-start TabFriends-section'>        
                { friends &&
                    friends.map(friend => (
                        <div className='d-flex flex-row justify-content-start' key={uuidv4()}>  
                            <img src={friend.imageSrc} alt={friend.username} style={{width:32, height: 32}}/>
                            <p className='mx-2' >friend request</p>
                            <input className='d-inline-block mx-5' style={{width: 18, height: 18}} type="radio" name={friend.id} value="accept" />
                            <input style={{width: 18, height: 18}} type="radio" name={friend.id} value="decline"/>
                        </div>
                           
                    ))
                }
              
                { friendsRoom &&
                    friendsRoom.map(friendRoom => (
                        <div className='d-flex flex-row justify-content-start' key={uuidv4()}>  
                            <img src={friendRoom.roomStyle} alt={friendRoom.roomname} style={{width:32, height: 32}}/>
                            <p className='ml-2 mr-4' >Room Invite</p>
                            <input className='d-inline-block mx-5' style={{width: 18, height: 18}} type="radio" name={friendRoom.roomname} value="accept" />
                            <input style={{width: 18, height: 18}} type="radio" name={friendRoom.roomname} value="decline"/>
                           
                        </div>
                           
                    ))
                }
              
            </section>
            <div><h6 className='Tabfriends-subtitle mt-4'>Online Friends:</h6></div>
            <section className='mb-4 mr-3 TabFriends-section'>
                
                { friends &&
                    friends.map(friend => (
                        <div className='d-flex flex-row justify-content-start' key={uuidv4()}>  
                            <img src={friend.imageSrc} alt={friend.username} style={{width:32, height: 32}}/>
                            <p className='mx-2' >{friend.username}</p>
                            <button className='TabFriends-profile-btn d-inline-block ml-auto mb-3 px-2 py-1' onClick={handleShow}><small> View Profile</small> </button>
                        </div>
                           
                    ))
                }
            </section>
            <div><h6 className='Tabfriends-subtitle mt-4'>Offiline Friends:</h6></div>
            <section className='mr-3 TabFriends-section'>    
                { friends &&
                    friends.map(friend => (
                        <div className='d-flex flex-row justify-content-start' key={uuidv4()}>  
                            <img src={friend.imageSrc} alt={friend.username} style={{width:32, height: 32}}/>
                            <p className='mx-2' >{friend.username}</p>
                            <button className='TabFriends-profile-btn d-inline-block ml-auto mb-3 px-2 py-1' onClick={handleShow}><small> View Profile</small> </button>
                        </div>
                           
                    ))
                }
            </section>
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Heading Text</Modal.Title>
                </Modal.Header>

                <Modal.Body>Modal content will sit here</Modal.Body>

                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClose}>Submit</Button>

                </Modal.Footer>

            </Modal>
        </div>
    );
}

export default TabFriends;
