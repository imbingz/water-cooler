import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ProfileModal from '../../Modals/ProfileModal';
import SidebarUsersCont from '../SidebarUsers';
import dummyFriends from '../../../data/friends';
import dummyFriendsRoom from '../../../data/friendsRoom';
import './TabFriends.css';

// * Tab Friends Dynamically Renders User's Inbound Friend/Room Requests and Online/Offline Friends.
//   It uses SidebarUsersCont to Render Each User and Their Button OptionsProfileModal
//   and uses ProfileModal To View Options for Interacting With User's Friends
// !* Rending Online Friends and Offline Friends Has Been Moved to Phase III Production 
//    but the Code for It is Still Here once We Have Online Detection in Place
function TabFriends(props) {

    // * Set States, State Helper Functions, and Other Variables
    
    // ** Manage State for Showing/Closing ProfileModal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // ** Pass Data from a Given .map and Store in profileFriend State
    const [profModalData, setProfModalData] = useState({});
    const handleFriendModal = (friend) => setProfModalData(friend);


    // * Render Dummy Or DB Data
    // ** A Yes Value will Render The DOM with Data From Data Folder, Changing this to 'no' Will Render DOM with DB Data
    let dummyData = 'no';
    let renderInpending;
    let renderOffFriends;
    // let renderOnFriends;
    let renderRoomInv;
    
    switch(dummyData) {
        case 'yes': 
            renderInpending = dummyFriends;
            renderOffFriends = dummyFriends;
            // renderOnFriends = dummyFriends;
            renderRoomInv = dummyFriendsRoom;
            break;
        default: 
            renderInpending = props.inpending;
            renderOffFriends = props.offFriends;
            // renderOnFriends = onFriends;
            renderRoomInv = props.inpendingRooms;
    }
    
    return (
        <Container className='px-4 pb-0 TabFriends-Cont'>
            {/* Requests */}
            <div className='d-flex justify-content-start'>
                {/* Check if There Is Data in RenderImpending, Meaning User Has At Least One Invitations To Render header tag */}
                { (renderInpending.length > 0) &&
                    <h6 className='my-4 Tabfriends-subtitle'>Friend Requests:</h6> 
                }
            </div>
            <section className='d-flex flex-column justify-content-start TabFriends-section'>
                {/* Render Friend Requests */}
                <SidebarUsersCont
                    data={renderInpending}
                    type="friend"
                    isRequest={true}
                    checkDBArrays={props.checkDBArrays}
                    handleFriendModal={handleFriendModal}
                    handleShow={handleShow}
                />

                {/* Check if There Is Data in RenderImpending, Meaning User Has At Least One Invitations To Render header tag */}
                { (renderRoomInv.length > 0) &&
                    <h6 className='mr-5 Tabfriends-subtitle'>Room Invitations:</h6> 
                }
                {/* Render Room Invites */}
                <SidebarUsersCont
                    data={renderRoomInv}
                    isRequest={true}
                    type="room"
                    checkDBArrays={props.checkDBArrays}
                    handleFriendModal={handleFriendModal}
                    handleShow={handleShow}
                />
            </section>
            
            {/* !* { note: development of online/offline functionality on the server side had been moved to phase three, the code is all here. We just need to uncomment these lines and the lines in the dummy data handler when that's working} *! */}

            {/* Friends */}
            {/* Online Friends */}
            {/* <div><h6 className='Tabfriends-subtitle mt-4'>Online Friends:</h6></div>
            <section className='mb-4 mr-3 TabFriends-section'>
                <SidebarUsersCont
                    data={renderOnFriends}
                    isRequest={false}
                    type="friend"
                    checkDBArrays={checkDBArrays}
                    handleFriendModal={handleFriendModal}
                    handleShow={handleShow}
                />
            </section> */}

            {/* Offline Friends */}
            {/* <div><h6 className='Tabfriends-subtitle mt-4'>Offline Friends:</h6></div> */}
            { (renderOffFriends.length > 0) &&
                    <h6 className='mr-5 Tabfriends-subtitle'>Friends:</h6> 
            }
            { (renderOffFriends.length === 0) &&
                    <h6 className='mr-5 Tabfriends-subtitle'>Use the Search Icon To Add Your Friends!</h6> 
            }
            <section className='mr-3 TabFriends-section'>
                <SidebarUsersCont
                    data={renderOffFriends}
                    isRequest={false}
                    type="friend"
                    checkDBArrays={props.checkDBArrays}
                    handleFriendModal={handleFriendModal}
                    handleShow={handleShow}
                />
            </section>
            <ProfileModal show={show} onHide={() => handleClose(false)}
                friend={profModalData}
                checkdb={props.checkDBArrays}
            />

        </Container>
    );
}

export default TabFriends;
