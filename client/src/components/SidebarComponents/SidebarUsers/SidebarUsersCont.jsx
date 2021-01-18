import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './SidebarUsersCont.css';

// * SidebarUserCont Requires Three Props To Conditionally Render
//   data = The Data To Be Mapped in jsx
//   isRequest = A True Value Will Cause the Component To Render Accept/Decline Buttons
//              A False Value Will Render 'View Profile' Button
//   type = By Passing 'friend' or 'room', The 'Accept' 'Decline' Buttons Will Hit a Switch Statement to Send The Server A 
//          Request to Either Handle Accepting/Declining Friend Requests or Room Invite
//          By Passing 'dm' With a False isRequest, 'View Profile' Will Render as 'View Chat'
// * We Also Pass Down Functions Through Props, this will Be Updated Later By Storing Necessary Variables in a Sidebar Context

const SidebarUsersCont = (props) => {

    // * Set States, State Helper Functions, and Other Variables

    // Check if user is in a room or space
    const path = window.location.pathname;
    let currentSpaceId = path.substring(44);
    let roomCheck = true;
    if (path.length > 70) {
        roomCheck = false;
    }

    const history = useHistory();

    const { _id } = JSON.parse(localStorage.getItem('USER'));

    // * Functions
    // * Pass User's Friend's ID and They Type of Request To Make
    const accept = async (id, type, spaceId) => {
        switch (type) {
            // ** Send User and Friend's IDs to Server To Process Accepting Friend Request
            case 'friend':
                try {
                    const request = await fetch('/api/friends/accept', {
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ friend: id, user: _id }),
                        method: 'PUT'
                    });
                    const status = await request.json();
                    if (status.success) {
                        toast.success('Added Friend!', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        toast.error('Failed to Add Friend!', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }

                    // *** Run Check DB to Update Render of Inbound and Friends Containers
                    props.checkDBArrays('inpending');
                    props.checkDBArrays('friends');
                } catch (err) {
                    console.log({ err });
                }
                break;
            // ** Send User and Friend's IDs to Server To Process Accepting Room Invite
            case 'room':
                try {
                    const request = await fetch('/api/room/accept', {
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ pubRoomId: id, user: _id }),
                        method: 'PUT'
                    });
                    const status = await request.json();
                    if (status.success) {
                        toast.success('Accepted Room Invite!', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        toast.error('Failed to Accept Room Invite', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                    // ** Run checkDBArrays ti Update Render Of inbound Room Invites
                    props.checkDBArrays('inpendingRooms');
                    history.push('/rooms/' + id);
                } catch (err) {
                    console.log({ err });
                }

                break;
            case 'space':
                let request;
                try {
                    // This Should work, just need to test
                    if (roomCheck) {
                        request = await fetch('/api/socialspace/join', {
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                nextPubSpaceId: spaceId,
                                user: _id
                            }),
                            method: 'PUT'
                        });
                    } else {
                        request = await fetch('/api/socialspace/join', {
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                nextPubSpaceId: spaceId,
                                oldPubSpaceId: currentSpaceId,
                                user: _id
                            }),
                            method: 'PUT'
                        });
                    }

                    const status = await request.json();

                    if (status.success) {
                        toast.success('Accepted Social Space Invite!', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        toast.error('Failed to Accept Social Space Invite', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }

                    props.checkDBArrays('inpendingSpaces');
                    history.push('/rooms/' + id + '/' + spaceId);
                } catch (err) {
                    console.log({ err });
                }

                break;
            default:
                toast.warning('No Valid Type', {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
        }
    };

    // * Pass User's Friend's ID and They Type of Request To Make for Declining Requests
    const decline = async (id, type, spaceId) => {
        switch (type) {
            // * Send User and Friend's IDs to Server To Process Declining Friend Request
            case 'friend':
                try {
                    const request = await fetch('/api/friends/decline', {
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ friend: id, user: _id }),
                        method: 'PUT'
                    });
                    const status = await request.json();
                    // Check returned status and notify user
                    if (status.success) {
                        toast.warning('Declined Friend Request', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        toast.error('Failed to Decline Friend Request', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }

                    // * Run Check DB to Update Render of Inbound Friends Containers
                    props.checkDBArrays('inpending');

                } catch (err) {
                    console.log({ err });
                }

                break;
            // ** Send User and Friend's IDs to Server To Process Declining Room Invite
            case 'room':

                try {
                    const request = await fetch('/api/room/decline', {
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ pubRoomId: id, user: _id }),
                        method: 'PUT'
                    });
                    const status = await request.json();
                    if (status.success) {
                        toast.warning('Declined Room Invite', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        toast.error('Failed to Decline Room Invite', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }

                    // ** Run checkDBArrays ti Update Render Of inbound Room Invites
                    props.checkDBArrays('inpendingRooms');
                } catch (err) {
                    console.log({ err });
                }
                break;
            case 'space':

                try {
                    const request = await fetch('/api/socialspace/decline', {
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nextPubSpaceId: spaceId, user: _id }),
                        method: 'PUT'
                    });
                    const status = await request.json();
                    if (status.success) {
                        toast.warning('Declined Social Space Invite', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        toast.error('Failed to Decline Social Space Invite', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }

                    // ** Run checkDBArrays ti Update Render Of inbound Space Invites
                    props.checkDBArrays('inpendingSpaces');
                } catch (err) {
                    console.log({ err });
                }
                break;
            default:
                toast.warning('No Valid Type', {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
        }
    };


    return (
        <>
            {/* Check If Data Has a Truthy Value then Render */}
            {props.data &&
                props.data.map(mapData => (

                    <div className='d-flex flex-row justify-content-start align-items-center mb-3' key={uuidv4()}>
                        <img
                            src={mapData.imageSrc || mapData.roomImg}
                            alt={mapData.username || mapData.roomName}
                            style={{ width: 32, height: 32 }}
                        />

                        {/* * Determine if Username or Room Name Should Render */}
                        {/* ** Check For Truthy Values In friend.username and friend.room to determine if the component received room or friend data, then use substring to limit their lengths */}
                        { mapData.username &&
                            <p className='mx-2 my-0 SbUserCont-Text'>
                                {mapData.username.substring(0, 15)}
                            </p>
                        }
                        { mapData.roomName &&
                            <p className='mx-2 my-0 SbUserCont-Text'>
                                {mapData.roomName.substring(0, 15)}
                            </p>
                        }
                        { mapData.socialSpaceName &&
                            <p className='mx-2 my-0 SbUserCont-Text'>
                                {mapData.socialSpaceName.substring(0, 15)}
                            </p>
                        }

                        {/* * Determine What Button Options Should Render */}
                        {/* ** View Profile or View Chat */}
                        {/* *** Check For False Value of isRequest and Type is Not DM To Render View Profile Button */}
                        {(!props.isRequest && props.type !== 'dm' && mapData.friendId !== _id) &&
                            <button
                                onClick={() => { props.handleShow(mapData); props.handleFriendModal(mapData); }}
                                className='SbUserCont-btn profile d-inline-block ml-auto px-2 py-1'

                            ><small>View Profile</small> </button>
                        }

                        {/* *** Check For False Value of isRequest and Type is DM To Render View Chats Button */}
                        {(!props.isRequest && props.type === 'dm') &&
                            <button
                                onClick={() => {
                                    props.showSidebar();
                                }}
                                className='SbUserCont-btn profile d-inline-block ml-auto px-2 py-1'

                            ><small>View Chat</small> </button>
                        }

                        {/* ** Accept Decline Buttons */}
                        {/* *** Check for True Value of isRequest to Render Accept Button */}
                        {props.isRequest &&
                            <button
                                onClick={() => {
                                    accept(
                                        mapData.friendId ||
                                        mapData.publicRoomId,
                                        props.type,
                                        mapData.publicSocialSpaceId,
                                    );
                                }}
                                className='SbUserCont-btn accept  d-inline-block mx-3 px-2'
                            ><small>Accept</small></button>
                        }
                        {/* *** Check for True Value of isRequest to Render Decline Button */}
                        {props.isRequest &&
                            <button
                                onClick={async () => {
                                    await decline(
                                        mapData.friendId ||
                                        mapData.publicRoomId,
                                        props.type,
                                        mapData.publicSocialSpaceId,
                                    );

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