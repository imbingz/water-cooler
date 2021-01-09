import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BiExit } from 'react-icons/bi';
import { FaVideo } from 'react-icons/fa';
import TabMembersProfileModal from '../../Modals/TabMembersProfileModal';
import roomMembers from '../../../data/friends';
import socialSpaces from '../../../data/socialSpaces';
import { v4 as uuidv4 } from 'uuid';
import './TabMembers.css';


function TabMembers() {

    // Modal for room member's Profile
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    const [tabMembersProfile, setTabMembersProfile] = useState({});
    const handleMembersProfileModal = (member) => setTabMembersProfile(member);


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
                {
                    roomMembers && 
                        roomMembers.map(member => (
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

                {/* 'View Profile modal is at the end */}

            </section>
            <section>
                {
                    socialSpaces.length > 0 && 
                        socialSpaces.map(socialSpace => (
                            <div key={uuidv4()}>
                                <div className='d-flex justify-content-between align-items-center my-3'>
                                    <h6 className='TabMembers-space-name my-3'>
                                        SocialSpace: {socialSpace.spaceName}
                                    </h6>
                                    <button className='TabMembers-join-btn' >
                                        <span>Join</span>
                                        <FaVideo size={20} style={{fill: 'orangered', marginLeft: 5}}/>
                                    </button>
                                </div>
                                <article>
                                    {
                                        socialSpace.members.map(member => (
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
