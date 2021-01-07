import React, {useState} from 'react';
import {Container} from 'react-bootstrap';
import TabMembersProfileModal from '../TabMembersProfileModal';
import './TabMembers.css';
import {v4 as uuidv4} from 'uuid';
import roomMembers from '../../data/friends';
import socialSpaces from '../../data/socialSpaces';

function TabMembers() {

    // Modal for room member's Profile
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    const [tabMembersProfile, setTabMembersProfile] = useState({});
    const handleMembersProfileModal = (roomMember) => setTabMembersProfile(roomMember);


    return (
        <Container className='d-flex flex-column pl-4 mr-2'>
            <section style={{backgroundColor: 'pink'}}>
                <div><h5 className='mt-4'>In Room</h5></div>
                {
                    roomMembers && 
                        roomMembers.map(roomMember => (
                            <div className='d-flex flex-row justify-content-start' key={uuidv4()}>  
                                <img src={roomMember.imageSrc} alt={roomMember.username} style={{width:32, height: 32}}/>
                                <p className='mx-2' >{roomMember.username}</p>
                                <button className='TabMembers-profile-btn d-inline-block ml-auto mb-3 px-2 py-1'
                                    onClick={() => {handleShow(); handleMembersProfileModal(roomMember);}}
                                ><small> View Profile</small> </button>
                            </div>

                        ))
                }

            </section>
            <section style={{backgroundColor: 'lightblue'}}>
                social space
            </section>

            <TabMembersProfileModal show={show} onHide={() => handleClose (false)} 
                roomMember={tabMembersProfile} 
            />
                
        </Container>

    );
}

export default TabMembers;
