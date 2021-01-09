import React, { useCallback, useEffect, useState } from 'react';
import './TabFriends.css';
// import friends from '../../data/friends';
import friendsRoom from '../../data/friendsRoom';
import { v4 as uuidv4 } from 'uuid';
import ProfileModal from '../ProfileModal';
import { Container } from 'react-bootstrap';


function TabFriends() {

    // * Set States, State Helper Functions, and Other Variables
    
    const { _id } = JSON.parse(localStorage.getItem('USER'));

    // ** Manage State for Showing/Closing ProfileModal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // ** Pass Data from a Given .map and Store in profileFriend State
    const [profModalData, setProfModalData] = useState({});
    const handleFriendModal = (friend) => setProfModalData(friend);

    // ** Create State for Mapping through User's Friends and Reqs
    const [inpending, setInpending] = useState([]);
    const [offFriends, setOffFriends] = useState([]);
    const [onFriends, setOnFriends] = useState([]);


    // * Functions
    // ** Send User and Friend's IDs to Server To Process Accepting Friend Request
    const acceptFriend = async (frenId) => {
        console.log('accepts');
        console.log(frenId);
        try {
            const request = await fetch('/api/friends/accept', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friend: frenId, user: _id }),
                method: 'PUT'
            });
            const status = await request.json();
            if (status.success) {
                window.alert('Done it');
            }
        } catch (err) {
            console.log({ err });
        }
    };

    // ** Check User's DB For Any Changes in friends or inboundPendingFriends by passing 'friends' or 'inpending'
    //  // Then store updated array values in State
    const checkDBArrays = useCallback(async (arr) => {
        try {
            const response = await fetch('/api/friends/arrays', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: _id, case: arr }),
                method: 'POST'
            });

            const data = await response.json();
            switch (arr) {
                case 'friends':
                    // console.log('friends: ', data.retUsers);
                    const friends = data.retUsers;
                    const offline = [];
                    const online = [];
                    friends.forEach(fren => {
                        (fren.status === 0) ? offline.push(fren) : online.push(fren);
                    });
                    setOffFriends(offline);
                    setOnFriends(online);
                    // console.log({offline});
                    break;
                case 'inpending':
                    // console.log('inpending: ', data.retUsers);
                    setInpending(data.retUsers);
                    break;
                default:
                    console.log('No valid array');
                    break;
            }
        } catch (err) {
            console.log({ err });
        }
    }, [_id]);

    // * Send User and Friend's IDs to Server To Process Declining Friend Request
    const declineFriend = async (frenId) => {
        try {
            const request = await fetch('/api/friends/decline', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friend: frenId, user: _id }),
                method: 'PUT'
            });
            const status = await request.json();
            if (status.success) {
                window.alert('Done it');
            }
        } catch (err) {
            console.log({ err });
        }
    };

    // * On Page Load, Check DB for Any Changes in User's friend and inboundPendingFriends Arrays 
    useEffect(() => {
        checkDBArrays('friends');
        checkDBArrays('inpending');
    }, [checkDBArrays]);


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

            {/* Friend Requests */}
            <section className='d-flex flex-column justify-content-start TabFriends-section'>
                {inpending &&
                    inpending.map(friend => (
                        <div className='d-flex flex-row justify-content-start' key={uuidv4()}>
                            <img src={friend.imageSrc} alt={friend.username} style={{ width: 32, height: 32 }} />
                            <p className='mx-2' >{friend.username}</p>
                            <input 
                                onChange={async () => {
                                    await acceptFriend(friend.friendId);
                                    checkDBArrays('inpending');
                                    checkDBArrays('friends');
                                }}
                                className='d-inline-block mx-5' style={{ width: 18, height: 18 }} type="radio" name={friend.id} value="accept" 
                            />
                            <input 
                                onChange={async () => {
                                    await declineFriend(friend.friendId);
                                    checkDBArrays('inpending');
                                }}
                                style={{ width: 18, height: 18 }} type="radio" name={friend.id} value="decline" 
                            />

                        </div>

                    ))
                }

                {/* Room Invites */}
                {friendsRoom &&
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
                {/* Online Friends */}
                {onFriends &&
                    onFriends.map(friend => (
                        <div className='d-flex flex-row justify-content-start' key={uuidv4()}>

                            <img src={friend.imageSrc} alt={friend.username} style={{ width: 32, height: 32 }} />

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
                {/* Offline Friends */}
                {offFriends &&
                    offFriends.map(friend => (
                        <div className='d-flex flex-row justify-content-start' key={uuidv4()}>
                            <img src={friend.imageSrc} alt={friend.username} style={{ width: 32, height: 32 }} />
                            <p className='mx-2' >{friend.username}</p>
                            <button className='TabFriends-profile-btn d-inline-block ml-auto mb-3 px-2 py-1'
                                onClick={() => { handleShow(); handleFriendModal(friend); }}

                            ><small> View Profile</small> </button>
                        </div>

                    ))
                }
            </section>
            <ProfileModal show={show} onHide={() => handleClose(false)}
                friend={profModalData}
                checkdb={checkDBArrays}
            />

        </Container>
    );
}

export default TabFriends;
