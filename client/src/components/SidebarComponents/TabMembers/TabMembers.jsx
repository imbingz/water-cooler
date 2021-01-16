import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BiExit } from 'react-icons/bi';
import { FaVideo } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import SidebarUsersCont from '../SidebarUsers';
import TabMembersProfileModal from '../../Modals/TabMembersProfileModal';
import { useGlobalContext } from '../../../utils/GlobalContext';
import dummyRoomMembers from '../../../data/friends';
import dummySocialSpaces from '../../../data/socialSpaces';
import dummySpaceInvites from '../../../data/friendsRoom';
import { v4 as uuidv4 } from 'uuid';
import './TabMembers.css';

// * Tab Members Renders Data Collected From TabNav to Display Where Each User Is In the Room
// !* There is Currently No Logic To Check Which Users Are Only in a Room and Not a Social Space, So All Users Will Render In Room
function TabMembers(props) {

    // * Set States, State Helper Functions, and Other Variables

    const [{ USER, }, dispatch] = useGlobalContext();

    const history = useHistory();

    // ** Store value of User Social Space Name
    const [spaceName, setSpaceName] = useState('');

    // * Get the pubSpaceId from the URL
    const path = window.location.pathname;
    // ** Variable is Set to False To Prevent Certain JSX From Rendering 
    // It will be Given a Truthy Value by Storing the Social Space ID When In a Space
    let spaceId = false;
    if (path.length > 70) {
        spaceId = path.substring(44);
    }

    // ** Manage State for Showing/Closing ProfileModal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // ** Pass Data from a Given .map and Store in tabMembersProfile State
    const [tabMembersProfile, setTabMembersProfile] = useState({});
    const handleMembersProfileModal = (member) => setTabMembersProfile(member);

    // ** Create State for Mapping through Room Users
    const [roomUsersData, setRoomUsersData] = useState([]);

    // * Functions
    // ** Check User's DB For Any Changes in either friends or inboundPendingFriends by passing 'friends' or 'inpending'
    //    Then store updated array values in State

    const checkDBArrays = useCallback(async (arr) => {
        try {
            const response = await fetch('/api/friends/arrays', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: USER._id, case: arr }),
                method: 'POST'
            });

            const data = await response.json();
            switch (arr) {
                case 'friends':
                    const friends = data.retUsers;
                    const offline = [];
                    const online = [];
                    friends.forEach(fren => {
                        (fren.status === 0) ? offline.push(fren) : online.push(fren);
                    });
                    // setOffFriends(offline);
                    // setOnFriends(online);
                    // console.log({offline});
                    break;
                case 'inpending':
                    // console.log('inpending: ', data.retUsers);
                    // setInpending(data.retUsers);
                    break;
                default:
                    console.log('No valid array');
                    break;
            }
        } catch (err) {
            console.log({ err });
        }
    }, [USER._id]);

    // * Send roomUsers Array To DB and Return Information of Each User to Store In State
    // !* It May Be Better To Have This Logic Be Run in Tabnav
    const getRoomUsers = useCallback(async (roomId) => {
        try {
            const request = await fetch('/api/room/users', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ users: props.roomData.roomUsers }),
                method: 'POST'
            });

            const response = await request.json();
       
            setRoomUsersData(response.retUsers);
        } catch (err) {
            console.log({ err });
        }
    }, [props.roomData.roomUsers]);

    // ** Request to the DB that User is Removed from roomUsers Array and Routed To Home
    const handleLeaveRoom = async () => {
        try {
            // *** Send pubRoomId and User ID to Server
            const request = await fetch('/api/room/leave', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pubRoomId: props.roomData.publicRoomId,
                    user: USER._id
                }),
                method: 'PUT'
            });

            const response = await request.json();
            // *** If Successful, Close the Sidebar and Route to Home Screen 
            if (response.success) {
                dispatch({ type: 'setShowAside', payload: false });
                history.push('/');
            }
        } catch (err) {
            console.log({ err });
        }
    };

    // ** Request to the DB that User is Removed from roomUsers Array and Routed To Home
    const handleEndRoom = async () => {
        try {
            // *** Send pubRoomId and User ID to Server
            const request = await fetch('/api/room/end', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pubRoomId: props.roomData.publicRoomId
                }),
                method: 'DELETE'
            });

            const response = await request.json();
            // *** If Successful, Close the Sidebar and Route to Home Screen 
            if (response.success) {
                dispatch({ type: 'setShowAside', payload: false });
                history.push('/');
            }
        } catch (err) {
            console.log({ err });
        }
    };

    // * Send Data To Create a Social Space and Route User To that Space
    const createSocialSpace = async () => {
        if (!spaceName) {
            toast.error('You Must Name Your Social Space', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        const pubSpaceId = uuidv4();
        const request = await fetch('/api/socialspace/create', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                publicRoomId: props.roomData.publicRoomId,
                publicSocialSpaceId: pubSpaceId,
                socialSpaceName: spaceName,
                user: USER._id,
            }),
            method: 'POST'
        });

        const response = await request.json();
        if (response.success) {
            dispatch({ type: 'setShowAside', payload: false });
            history.push('/rooms/' + props.roomData.publicRoomId + '/' + pubSpaceId);
        }
    };

    // * Send Data To DB To Join A Space and Conditionally Remove User From Previous Space If They Were in One,
    //   Then Route to Space
    const joinSpace = async (newSpaceId) => {
        try {
            const request = await fetch('/api/socialspace/join', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nextPubSpaceId: newSpaceId,
                    oldPubSpaceId: spaceId,
                    user: USER._id
                }),
                method: 'PUT'
            });
            const status = await request.json();

            if (status.success) {
                toast.success('Joined Social Space!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                toast.error('Failed to Join Social Space', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            // ** Run checkDBArrays to Update Render Of inbound Room Invites
            dispatch({ type: 'setShowAside', payload: false });
            history.push('/rooms/' + props.roomData.publicRoomId + '/' + newSpaceId);
        } catch (err) {
            console.log({ err });
        }
    };

    const leaveSpace = async (spaceId) => {
        const request = await fetch('/api/socialspace/leave', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pubSpaceId: spaceId,
                user: USER._id
            }),
            method: 'PUT'
        });
        const status = await request.json();
        console.log(status);

        if (status.success) {
            toast.success('Left Social Space!', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error('Failed to Leave Social Space', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        // ** Run checkDBArrays to Update Render Of inbound Room Invites
        dispatch({ type: 'setShowAside', payload: false });
        history.push('/rooms/' + props.roomData.publicRoomId);
    }

    // * On Page Load, Check DB for Any Changes in User's friend and inboundPendingFriends Arrays 
    useEffect(() => {
        getRoomUsers();
    }, [getRoomUsers]);




    // // * Render Dummy Or DB Data
    let dummyData = 'no';
    let renderRoomUsers;
    let renderSocialSpaces;
    let renderSpaceInvites;

    switch (dummyData) {
        case 'yes':
            renderRoomUsers = dummyRoomMembers;
            renderSocialSpaces = dummySocialSpaces;
            renderSpaceInvites = dummySpaceInvites;

            break;
        default:
            renderRoomUsers = roomUsersData;
            renderSocialSpaces = props.spaceData;
            renderSpaceInvites = props.inpendingSpaces;
    }

    return (
        <Container className='d-flex flex-column pl-4 mr-2 pb-5'>

            {/* Create Social Space Button */}
            <section className='d-flex justify-content-end mt-3 row'>
                <input
                    className='px-2 col'
                    required
                    id="spaceName"
                    type='text'
                    name='spaceName'
                    placeholder='Name a New Social Space'
                    value={spaceName}
                    onChange={(e) => setSpaceName(e.target.value)}
                />
                <button
                    className='TabMembers-create-space-btn col'
                    onClick={() => { createSocialSpace(); }}
                >
                    <span>Create A Social Space</span>
                    <FaVideo size={20} style={{ fill: 'orangered', marginLeft: 10 }} />

                </button>
            </section>
            
            {/* Space Invites */}
            {(props.inpendingSpaces.length > 0) &&
                <section className='TabMembers-room-section pb-3'>
                    <h5 className='mt-4 mb-3 TabMembers-room-header'>Social Space Invites</h5>
                    <SidebarUsersCont
                        data={renderSpaceInvites}
                        isRequest={true}
                        type="space"
                        checkDBArrays={props.checkDBArrays}
                        handleFriendModal={handleMembersProfileModal}
                        handleShow={handleShow}
                    />
                </section>
            }

            {/* Container For Room Header, Leave/End Room, Render All Users in Room   */}
            <section className='TabMembers-room-section pb-3'>
                {/* If User is Not Host, Show Leave Room Button with Appropriate Logic */}
                {(USER._id !== props.roomData.roomCreator) &&
                    <div className='d-flex justify-content-between align-items-center my-3'>
                        <h5 className='mt-4 mb-3 TabMembers-room-header'>In Room: {props.roomData.roomName}
                        </h5>
                        <button
                            className='TabMembers-exit-btn'
                            onClick={() => { handleLeaveRoom(); }}
                        >
                            <span>Leave Room</span>
                            <BiExit size={23} style={{ fill: 'orangered', marginLeft: 5 }} />
                        </button>
                    </div>
                }

                {/* If User is Host, Show End Room Button with Appropriate Logic */}
                {(USER._id === props.roomData.roomCreator) &&
                    <div className='d-flex justify-content-between align-items-center my-3'>
                        <h5 className='mt-4 mb-3 TabMembers-room-header'>In Room: {props.roomData.roomName}
                        </h5>
                        <button
                            className='TabMembers-exit-btn'
                            onClick={() => { handleEndRoom(); }}
                        >
                            <span>End Room</span>
                            <BiExit size={23} style={{ fill: 'orangered', marginLeft: 5 }} />
                        </button>
                    </div>
                }

                {/* Render Room Room Users */}

                <SidebarUsersCont
                    data={renderRoomUsers}
                    type=""
                    isRequest={false}
                    checkDBArrays={checkDBArrays}
                    handleFriendModal={handleMembersProfileModal}
                    handleShow={handleShow}
                />


                {/* 'View Profile modal is at the end */}

            </section>

            {/* Container For Social Space Headers, Join Space, Render All Users in Instanced Space   */}
            <section>
                {
                    renderSocialSpaces.length > 0 &&
                    renderSocialSpaces.map(socialSpace => (

                        <div key={uuidv4()}>
                            <div className='d-flex justify-content-between align-items-center my-3'>
                                <h6 className='TabMembers-space-name my-3'>
                                    SocialSpace: {socialSpace.socialSpaceName}
                                </h6>
                                { (socialSpace.publicSocialSpaceId === spaceId) &&
                                    <button
                                        className='TabMembers-join-btn'
                                        onClick={() => { leaveSpace(socialSpace.publicSocialSpaceId); }}
                                    >
                                        <span>Leave</span>
                                        <FaVideo size={20} style={{ fill: 'orangered', marginLeft: 5 }} />
                                    </button>
                                }  
                                { (socialSpace.publicSocialSpaceId === !spaceId) &&
                                    <button
                                        className='TabMembers-join-btn'
                                        onClick={() => { joinSpace(socialSpace.publicSocialSpaceId); }}
                                    >
                                        <span>Join</span>
                                        <FaVideo size={20} style={{ fill: 'orangered', marginLeft: 5 }} />
                                    </button>
                                }
                            </div>
                            {/* Social Space Users */}
                            <article>
                                <SidebarUsersCont
                                    data={socialSpace.socialSpaceUsers}
                                    type=""
                                    isRequest={false}
                                    checkDBArrays={checkDBArrays}
                                    handleFriendModal={handleMembersProfileModal}
                                    handleShow={handleShow}
                                />

                            </article>
                        </div>
                    ))
                }
            </section>

            <TabMembersProfileModal
                show={show}
                onHide={() => handleClose(false)}
                member={tabMembersProfile}
            />

        </Container>

    );
}

export default TabMembers;
