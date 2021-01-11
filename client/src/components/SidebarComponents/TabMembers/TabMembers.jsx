import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BiExit } from 'react-icons/bi';
import { FaVideo } from 'react-icons/fa';
import SidebarUsersCont from '../SidebarUsers';
import TabMembersProfileModal from '../../Modals/TabMembersProfileModal';
import { useGlobalContext } from '../../../utils/GlobalContext';
import roomMembers from '../../../data/friends';
import socialSpaces from '../../../data/socialSpaces';
import { v4 as uuidv4 } from 'uuid';
import './TabMembers.css';


function TabMembers() {

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
    const [roomUser, setRoomUser] = useState([]);
    const [inpending, setInpending] = useState([]);

    // * Functions
    // ** Check User's DB For Any Changes in either friends or inboundPendingFriends by passing 'friends' or 'inpending'
    //  // Then store updated array values in State
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

    

    // * On Page Load, Check DB for Any Changes in User's friend and inboundPendingFriends Arrays 
    useEffect(() => {
        checkDBArrays('inpending');
    }, [checkDBArrays]);

    

 
    // // * Render Dummy Or DB Data
    let dummyData = 'yes';
    let renderInpending;
    // let renderOffFriends;
    // let renderOnFriends;
    // let renderRoomInv;

    switch(dummyData) {
        case 'yes': 
            renderInpending = roomMembers;
            
            break;
        default: 
            renderInpending = inpending;
            
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
                        <BiExit size={23} style={{fill: 'orangered', marginLeft: 5}}/>
                    </button>

                   
                </div>
                {/* Room Users */}
                <SidebarUsersCont
                    data={renderInpending}
                    type="room"
                    isRequest={false}
                    checkDBArrays={checkDBArrays}
                    handleFriendModal={handleMembersProfileModal}
                    handleShow={handleShow}
                />
    

                {/* 'View Profile modal is at the end */}

            </section>
            <section>
                {
                    socialSpaces.length > 0 && 
                        socialSpaces.map(socialSpace => (
                            <div key={uuidv4()}>
                                <div className='d-flex justify-content-between align-items-center my-3'>
                                    <h6 className='TabMembers-space-name my-3'>
                                        SocialSpace: {socialSpace.socialSpaceName}
                                    </h6>
                                    <button className='TabMembers-join-btn' >
                                        <span>Join</span>
                                        <FaVideo size={20} style={{fill: 'orangered', marginLeft: 5}}/>
                                    </button>
                                </div>
                                <article>
                                    {
                                        socialSpace.socialSpaceUsers.map(member => (
                                            <div className='d-flex flex-row justify-content-start' key={uuidv4()}>  
                                                <img src={member.imageSrc} alt={member.username} style={{width:32, height: 32}}/>
                                                <p className='mx-2' >{member.username}</p>
                                                <button 
                                                    className='TabMembers-profile-btn d-inline-block ml-auto mb-3 px-2 py-1'
                                                    onClick={() => {handleShow(); 
                                                        handleMembersProfileModal(member);}}
                                                >
                                                    <small> View Profile</small> 
                                                </button>
                                            </div>
                                        ))
                                    } 
                                </article>
                            </div>
                        ))
                }
            </section>

            <TabMembersProfileModal show={show} onHide={() => handleClose (false)} 
                member={tabMembersProfile} 
            />
                
        </Container>

    );
}

export default TabMembers;
