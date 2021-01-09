import React from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import './SidebarUsersCont.css';

const SidebarUsersCont = (props) => {

    // * Set States, State Helper Functions, and Other Variables
    
    const { _id } = JSON.parse(localStorage.getItem('USER'));

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
                toast.success('Added Friend!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (err) {
            console.log({ err });
        }
    };

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
                toast.error('Declined Friend Request', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (err) {
            console.log({ err });
        }
    };


    return (
        <>
            {props.data &&
                    props.data.map(friend => (
                        <div className='d-flex flex-row justify-content-start align-items-center mb-2' key={uuidv4()}>

                            <img src={friend.imageSrc} alt={friend.username} style={{ width: 32, height: 32 }} />

                            <p className='mx-2 my-0 SbUserCont-Text'>{friend.username}</p>

                            {!props.isRequest &&
                            <button className='SbUserCont-btn profile d-inline-block ml-auto mb-3 px-2 py-1' 
                                onClick={() => {props.handleShow(friend); props.handleFriendModal(friend);}}
                            
                            ><small> View Profile</small> </button>
                            }
                            {props.isRequest &&
                                <button 
                                    onClick={async () => {
                                        await acceptFriend(friend.friendId);
                                        props.checkDBArrays('inpending');
                                        props.checkDBArrays('friends');
                                    }}
                                    className='SbUserCont-btn accept  d-inline-block mx-3 px-2'
                                ><small>Accept</small></button>
                            }
                            {props.isRequest &&
                                <button 
                                    onClick={async () => {
                                        await declineFriend(friend.friendId);
                                        props.checkDBArrays('inpending');
                                    }}
                                    className='SbUserCont-btn decline  d-inline-block px-2'
                                ><small>Decline</small></button> 
                            }
                                  
                        </div>

                    ))
            }
        </>
    );
};

export default SidebarUsersCont;