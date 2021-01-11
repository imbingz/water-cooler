import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BiExit } from 'react-icons/bi';
import { FaVideo } from 'react-icons/fa';
import SidebarUsersCont from '../SidebarUsers';
import TabMembersProfileModal from '../../Modals/TabMembersProfileModal';
import { useGlobalContext } from '../../../utils/GlobalContext';
import dummyRoomMembers from '../../../data/friends';
import dummySocialSpaces from '../../../data/socialSpaces';
import { v4 as uuidv4 } from 'uuid';
import './TabMembers.css';


function TabMembers(props) {
    // * Set States, State Helper Functions, and Other Variables
    const [{ USER },] = useGlobalContext();

    // ** Manage State for Showing/Closing ProfileModal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ** Pass Data from a Given .map and Store in tabMembersProfile State
    const [tabMembersProfile, setTabMembersProfile] = useState({});
    const handleMembersProfileModal = (member) => setTabMembersProfile(member);

    // ** Create State for Mapping through Room Users
    
    const [roomUsersData, setRoomUsersData] = useState([]);
    const [inpending, setInpending] = useState([]);

    // * Functions
    // ** Check User's DB For Any Changes in either friends or inboundPendingFriends by passing 'friends' or 'inpending'
    //  // Then store updated array values in State
    const checkDBArrays = useCallback(async (arr) => {
        try {
            const request = await fetch('/api/friends/arrays', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: USER._id, case: arr }),
                method: 'POST'
            });

            const data = await request.json();
            switch (arr) {
                case 'friends':
                    // console.log('friends: ', data.retUsers);
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

    const getRoomUsers = useCallback(async (roomId) => {
        // console.log('room user req');
        // console.log(props.roomData.roomUsers);
        try {
            const request = await fetch('/api/room/users', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ users: props.roomData.roomUsers }),
                method: 'POST'
            });

            const response = await request.json();
            // console.log('room users');
            // console.log(response);

            setRoomUsersData(response.retUsers);
            
        } catch (err) {
            console.log({ err });
        }
    }, [props.roomData.roomUsers]);


    // * On Page Load, Check DB for Any Changes in User's friend and inboundPendingFriends Arrays 
    useEffect(() => {
        checkDBArrays('inpending');
        getRoomUsers();
    }, [checkDBArrays, getRoomUsers]);




    // // * Render Dummy Or DB Data
    let dummyData = 'no';
    let renderRoomUsers;
    let renderSocialSpaces;
    // let renderOffFriends;
    // let renderOnFriends;
    // let renderRoomInv;

    switch (dummyData) {
        case 'yes':
            renderRoomUsers = dummyRoomMembers;
            renderSocialSpaces = dummySocialSpaces;

            break;
        default:
            renderRoomUsers = roomUsersData;
            renderSocialSpaces = dummySocialSpaces;

        // renderRoomInv = someStateOrSomething;
    }

    //  !* Need to make some seed data for social spaces so I can get these containers dynamically rending

    return (
        <Container className='d-flex flex-column pl-4 mr-2 pb-5'>
            <section className='TabMembers-room-section pb-3'>
                <div className='d-flex justify-content-between align-items-center my-3'>
                    <h5 className='mt-4 mb-3 TabMembers-room-header'>In Room
                    </h5>
                    <button className='TabMembers-exit-btn' >
                        <span>Leave Room</span>
                        <BiExit size={23} style={{ fill: 'orangered', marginLeft: 5 }} />
                    </button>


                </div>
                {/* Room Users */}
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
            <section>
                {
                    renderSocialSpaces.length > 0 &&
                    renderSocialSpaces.map(socialSpace => (
                        <div key={uuidv4()}>
                            <div className='d-flex justify-content-between align-items-center my-3'>
                                <h6 className='TabMembers-space-name my-3'>
                                    SocialSpace: {socialSpace.socialSpaceName}
                                </h6>
                                <button className='TabMembers-join-btn' >
                                    <span>Join</span>
                                    <FaVideo size={20} style={{ fill: 'orangered', marginLeft: 5 }} />
                                </button>
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

            <TabMembersProfileModal show={show} onHide={() => handleClose(false)}
                member={tabMembersProfile}
            />

        </Container>

    );
}

export default TabMembers;
