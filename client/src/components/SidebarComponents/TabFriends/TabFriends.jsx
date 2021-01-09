import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProfileModal from '../../Modals/ProfileModal';
import SidebarUsersCont from '../SidebarUsers';
import dummyFriends from '../../../data/friends';
import dummyFriendsRoom from '../../../data/friendsRoom';
import { v4 as uuidv4 } from 'uuid';
import './TabFriends.css';


function TabFriends() {

    let dummyData = 'yes';

    // * Set States, State Helper Functions, and Other Variables
    
    const { _id } = JSON.parse(localStorage.getItem('USER'));

    // ** Manage State for Showing/Closing ProfileModal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // ** Pass Data from a Given .map and Store in profileFriend State
    const [profModalData, setProfModalData] = useState({});
    const handleFriendModal = (friend) => setProfModalData(friend);

    // ** Create State for Mapping through User's Friends and Reqs
    const [inpending, setInpending] = useState([]);
    const [offFriends, setOffFriends] = useState([]);
    const [onFriends, setOnFriends] = useState([]);

   

    // * Functions

    // ** Check User's DB For Any Changes in friends or inboundPendingFriends by passing 'friends' or 'inpending'
    //  // Then store updated array values in State
    const checkDBArrays = useCallback(async (arr) => {
        try {
            const response = await fetch('/api/friends/arrays', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: _id, case: arr }),
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
    }, [_id]);

    

    // * On Page Load, Check DB for Any Changes in User's friend and inboundPendingFriends Arrays 
    useEffect(() => {
        checkDBArrays('friends');
        checkDBArrays('inpending');
    }, [checkDBArrays]);


    // * Render Dummy Or DB Data
    let renderInpending;
    let renderOffFriends;
    let renderOnFriends;
    let renderRoomInv;

    switch(dummyData) {
        case 'yes': 
            renderInpending = dummyFriends;
            renderOffFriends = dummyFriends;
            renderOnFriends = dummyFriends;
            renderRoomInv = dummyFriendsRoom;
            break;
        default: 
            renderInpending = inpending;
            renderOffFriends = offFriends;
            renderOnFriends = onFriends;
            // renderRoomInv = someStateOrSomething;
    }


    return (
        <Container className='ml-2 mr-3 mt-3'>
            {/* Requests */}
            <div className='d-flex justify-content-start'>
                <h6 className='mr-5 Tabfriends-subtitle'>Invitations:</h6> 
            </div>
            <section className='d-flex flex-column justify-content-start TabFriends-section'>
                {/* Friend Requests */}
                <SidebarUsersCont
                    data={renderInpending}
                    type="friend"
                    isRequest={true}
                    checkDBArrays={checkDBArrays}
                    handleFriendModal={handleFriendModal}
                    handleShow={handleShow}
                />

                {/* Room Invites */}
                <SidebarUsersCont
                    data={renderRoomInv}
                    isRequest={true}
                    type="room"
                    checkDBArrays={checkDBArrays}
                    handleFriendModal={handleFriendModal}
                    handleShow={handleShow}
                />
                {renderRoomInv &&
                    renderRoomInv.map(friendRoom => (
                        <div className='d-flex flex-row justify-content-start align-items-center mb-2' key={uuidv4()}>  
                            <img 
                                src={friendRoom.roomStyle}
                                alt={friendRoom.roomname}
                                style={{width:32, height: 32}}
                            />
                            <p className='mx-2 my-0 TabFriends-Text' >Room Invite</p>
                            <button className='TabFriends-btn accept  d-inline-block mx-3 px-2'><small>Accept</small></button>
                            <button className='TabFriends-btn decline  d-inline-block px-2'><small>Decline</small></button>
                        </div>
                    ))
                }
            </section>
            
            {/* Friends */}
            {/* Online Friends */}
            <div><h6 className='Tabfriends-subtitle mt-4'>Online Friends:</h6></div>
            <section className='mb-4 mr-3 TabFriends-section'>
                <SidebarUsersCont
                    data={renderOnFriends}
                    isRequest={false}
                    type="friend"
                    checkDBArrays={checkDBArrays}
                    handleFriendModal={handleFriendModal}
                    handleShow={handleShow}
                />
            </section>

            {/* Offline Friends */}
            <div><h6 className='Tabfriends-subtitle mt-4'>Offline Friends:</h6></div>
            <section className='mr-3 TabFriends-section'>
                <SidebarUsersCont
                    data={renderOffFriends}
                    isRequest={false}
                    type="friend"
                    checkDBArrays={checkDBArrays}
                    handleFriendModal={handleFriendModal}
                    handleShow={handleShow}
                />
            </section>
            <ProfileModal show={show} onHide={() => handleClose(false)}
                friend={profModalData}
                checkdb={checkDBArrays}
            />

        </Container>
    );
}

export default TabFriends;
