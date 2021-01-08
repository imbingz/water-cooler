import React, {useState} from 'react';
import './TabFriends.css';
import friends from '../../data/friends';
import friendsRoom from '../../data/friendsRoom';
import {v4 as uuidv4} from 'uuid';
import ProfileModal from '../ProfileModal';
import { Container } from 'react-bootstrap';


function TabFriends() {

    // Modal for friend's Profile
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [profileFriend, setProfileFriend] = useState({});
    const handleFriendModal = (friend) => setProfileFriend(friend);
    


    return (
        <Container className='ml-2 mr-3 mt-3'>
            <div className='d-flex justify-content-start'>
                <h6 className='mr-5 Tabfriends-subtitle'>Invitations:</h6> 
            </div>
                
            <section className='d-flex flex-column justify-content-start TabFriends-section'>        
                { friends &&
                    friends.map(friend => (
                        <div className='d-flex flex-row justify-content-start align-items-center mb-2' key={uuidv4()}>  
                            <img src={friend.imageSrc} alt={friend.username} style={{width:32, height: 32}}/>

                            <p className='mx-2 my-0' >friend request</p>

                            <button className='TabFriends-btn accept  d-inline-block mx-3 px-2'><small>Accept</small></button>

                            <button className='TabFriends-btn decline  d-inline-block px-2'><small>Decline</small></button>
                        </div>
                           
                    ))
                }
              
                { friendsRoom &&
                    friendsRoom.map(friendRoom => (
                        <div className='d-flex flex-row justify-content-start align-items-center mb-2' key={uuidv4()}>  
                            <img src={friendRoom.roomStyle} alt={friendRoom.roomname} style={{width:32, height: 32}}/>

                            <p className='ml-2 mr-4 my-0' >Room Invite</p>

                            <button className='TabFriends-btn accept  d-inline-block mx-3 px-2'><small>Accept</small></button>

                            <button className='TabFriends-btn decline  d-inline-block px-2'><small>Decline</small></button>                      
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

                            <button className='TabFriends-btn profile d-inline-block ml-auto mb-3 px-2 py-1' 
                                onClick={() => {handleShow(friend); handleFriendModal(friend);}}
                            ><small> View Profile</small> </button>
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
                            
                            <button className='TabFriends-btn profile d-inline-block ml-auto mb-3 px-2 py-1'
                                onClick={() => {handleShow(); handleFriendModal(friend);}}
                            ><small> View Profile</small> </button>
                        </div>
                           
                    ))
                }
            </section>
            <ProfileModal show={show} onHide={() => handleClose (false)} 
                friend={profileFriend} 
            />
            
        </Container>
    );
}

export default TabFriends;
