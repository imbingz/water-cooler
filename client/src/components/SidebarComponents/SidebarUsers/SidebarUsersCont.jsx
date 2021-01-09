import React from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import './SidebarUsersCont.css';

const SidebarUsersCont = (props) => {

    // * Set States, State Helper Functions, and Other Variables

    const { _id } = JSON.parse(localStorage.getItem('USER'));

    // * Functions
    
    const accept = async (frenId, type) => {
        switch (type) {
            // ** Send User and Friend's IDs to Server To Process Accepting Friend Request
            case 'friend':
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
                break;
            case 'room':
                console.log('Manage Room Accept');
                break;
            default:
                console.log('No Valid Type');
                break;
        }
    };

    const decline = async (frenId, type) => {
        switch (type) {            
            // * Send User and Friend's IDs to Server To Process Declining Friend Request
            case 'friend':
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
                break;
                
            case 'room':
                console.log('Manage Room Decline');
                break;
            default:
                console.log('No Valid Type');
                break;
        }
    };


    return (
        <> 
            {props.data &&
                props.data.map(friend => (
        
                    <div className='d-flex flex-row justify-content-start align-items-center mb-2' key={uuidv4()}>

                        <img
                            src={friend.imageSrc || friend.roomStyle}
                            alt={friend.username || friend.roomname}
                            style={{ width: 32, height: 32 }}
                        />

                        <p className='mx-2 my-0 SbUserCont-Text'>{friend.username || friend.roomname}</p>

                        {!props.isRequest &&
                            <button
                                onClick={() => { props.handleShow(friend); props.handleFriendModal(friend); }}
                                className='SbUserCont-btn profile d-inline-block ml-auto mb-3 px-2 py-1'

                            ><small> View Profile</small> </button>
                        }
                        {props.isRequest &&
                            <button
                                onClick={async () => {
                                    await accept(friend.friendId, props.type);
                                    props.checkDBArrays('inpending');
                                    props.checkDBArrays('friends');
                                }}
                                className='SbUserCont-btn accept  d-inline-block mx-3 px-2'
                            ><small>Accept</small></button>
                        }
                        {props.isRequest &&
                            <button
                                onClick={async () => {
                                    await decline(friend.friendId, props.type);
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