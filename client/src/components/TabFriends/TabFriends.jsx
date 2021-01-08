import React, { useCallback, useEffect, useState } from 'react';
import './TabFriends.css';
// import friends from '../../data/friends';
import friendsRoom from '../../data/friendsRoom';
import { v4 as uuidv4 } from 'uuid';
import ProfileModal from '../ProfileModal';
import { Container } from 'react-bootstrap';


function TabFriends() {

    const storedUser = JSON.parse(localStorage.getItem('USER'));
    const id = storedUser._id;
    // Modal for friend's Profile
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [profileFriend, setProfileFriend] = useState({});
    const handleFriendModal = (friend) => setProfileFriend(friend);

    // const [friends, setFriends] = useState([]);
    const [inpending, setInpending] = useState([]);
    const [offFriends, setOffFriends] = useState([]);
    const [onFriends, setOnFriends] = useState([]);

    const checkDBArrays = useCallback(async (arr) => {
        try {
            const response = await fetch('/api/friends/arrays', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id, case: arr }),
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
    }, [id]);

    useEffect(() => {
        
        checkDBArrays('inpending');
        checkDBArrays('friends');

    }, [checkDBArrays]);

    const acceptFriend = async (frenId) => {
        console.log('accepts');
        console.log(frenId);
        try {
            const request = await fetch('/api/friends/accept', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friend: frenId, user: id }),
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


    // * Send User and Friend's IDs to Server To Process Declining Friend Request
    const declineFriend = async (frenId) => {
        console.log('decline');
        try {
            const request = await fetch('/api/friends/decline', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friend: frenId, user: id }),
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


    return (
        <Container className='mx-3 mt-3'>
            <div className='d-flex justify-content-start'>
                <h6 className='mr-5 Tabfriends-subtitle'>Invitations:</h6>
                <small className='ml-5 text-success '>Accept</small>
                <small className='ml-4 text-danger'>Decline</small>
            </div>

            {/* Friend Requests */}
            <section className='d-flex flex-column justify-content-start TabFriends-section'>
                {inpending &&
                    inpending.map(friend => (
                        <div className='d-flex flex-row justify-content-start' key={uuidv4()}>
                            <img src={friend.imageSrc} alt={friend.username} style={{ width: 32, height: 32 }} />
                            <p className='mx-2' >{friend.username}</p>
                            <input 
                                onChange={() => {
                                    acceptFriend(friend.friendId);
                                    checkDBArrays('inpending');
                                    checkDBArrays('friends');
                                }}
                                className='d-inline-block mx-5' style={{ width: 18, height: 18 }} type="radio" name={friend.id} value="accept" 
                            />
                            <input 
                                onChange={() => {
                                    declineFriend(friend.friendId);
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
                        <div className='d-flex flex-row justify-content-start' key={uuidv4()}>
                            <img src={friendRoom.roomStyle} alt={friendRoom.roomname} style={{ width: 32, height: 32 }} />

                            <p className='ml-2 mr-4' >Room Invite</p>

                            <input className='d-inline-block mx-5' style={{ width: 18, height: 18 }} type="radio" name={friendRoom.roomname} value="accept" />

                            <input style={{ width: 18, height: 18 }} type="radio" name={friendRoom.roomname} value="decline" />

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

                            <button className='TabFriends-profile-btn d-inline-block ml-auto mb-3 px-2 py-1'
                                onClick={() => { handleShow(friend); handleFriendModal(friend); }}
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
                friend={profileFriend}
                checkdb={checkDBArrays}
            />

        </Container>
    );
}

export default TabFriends;
