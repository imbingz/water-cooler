import React from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import './SidebarUsersCont.css';

// * SidebarUserCont Requires Three Props To Conditionally Render
//   data = The Data To Be Mapped in jsx
//   isRequest = A Truthy Value Will Cause the Component To Render Accept/Decline Buttons
//              A Falsy Value Will Render View Profile Button
//   type = By Passing 'friend' or 'room', The Accept Decline Buttons Will Hit a Switch Statement to Send The Server A 
//         Request to Either Handle Accepting/Declining Friend Requests or Room Invite
// * We Also Pass Down Functions Through Props, this will Be Updated Later By Storing Necessary Variables in a Sidebar Context

const SidebarUsersCont = (props) => {

    // * Set States, State Helper Functions, and Other Variables

    // !* Depreciated - We need to pull this from global context instead
    const { _id } = JSON.parse(localStorage.getItem('USER'));

    // * Functions
    // * Pass User's Friend's ID and They Type of Request To Make
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
                    console.log(status);
                    // console.log(status.success);
                    if (status.success) {
                        toast.success('Added Friend!', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                } catch (err) {
                    console.log({ err });
                }
                break;
            // ** Send User and Friend's IDs to Server To Process Accepting Room Invite
            case 'room':
                console.log('Manage Room Accept');
                break;
            default:
                console.log('No Valid Type');
                break;
        }
    };

    // * Pass User's Friend's ID and They Type of Request To Make for Declining Requests
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
                    console.log(status.success);
                    if (status.success) {
                        toast.error('Declined Friend Request', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                } catch (err) {
                    console.log({ err });
                }
                break;
            // ** Send User and Friend's IDs to Server To Process Accepting Room Invite
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
            {/* Check If Data Has a Truthy Value then Render */}
            {props.data &&
                props.data.map(friend => (
        
                    <div className='d-flex flex-row justify-content-start align-items-center mb-2' key={uuidv4()}>

                        <img
                            src={friend.imageSrc || friend.roomStyle}
                            alt={friend.username || friend.roomname}
                            style={{ width: 32, height: 32 }}
                        />

                        <p className='mx-2 my-0 SbUserCont-Text'>{friend.username || friend.roomname}</p>

                        {/* Check For False Value of isRequest To Render View Profile Button */}
                        {!props.isRequest &&
                            <button
                                onClick={() => { props.handleShow(friend); props.handleFriendModal(friend); }}
                                className='SbUserCont-btn profile d-inline-block ml-auto mb-3 px-2 py-1'

                            ><small> View Profile</small> </button>
                        }
                        {/* Check for True Value of isRequest to Render Accept Button */}
                        {props.isRequest &&
                            <button
                                onClick={async () => {
                                    await accept(friend.friendId, props.type);
                                    // * Run Check DB to Update Render of Inbound and Friends Containers
                                    props.checkDBArrays('inpending');
                                    props.checkDBArrays('friends');
                                }}
                                className='SbUserCont-btn accept  d-inline-block mx-3 px-2'
                            ><small>Accept</small></button>
                        }
                        {/* Check for True Value of isRequest to Render Decline Button */}
                        {props.isRequest &&
                            <button
                                onClick={async () => {
                                    await decline(friend.friendId, props.type);
                                    // * Run Check DB to Update Render of Inbound Friends Containers
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