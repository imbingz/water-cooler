import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CreateRoom from '../components/HomepageComponents/CreateRoom';
import FriendsRoom from '../components/HomepageComponents/FriendsRoom';
import RoomCarousel from '../components/HomepageComponents/RoomCarousel';
import { useGlobalContext } from '../utils/GlobalContext';

// * Homepage Requests User Friend Information to Render Open Rooms 
// !* Note: A similar request is being made in TabNav, Future Development Will Make This Data Request Once 
//    Then Send it Down To These Components 
const Homepage = () => {

    const [{ USER },] = useGlobalContext();
    const _id = USER._id;

    // * Store Data in State For Use in CreateRoom and FriendRoom Components
    const [allFriends, setAllFriends] = useState([]);
    const [roomsData, setRoomsData] = useState([]);
    
    // ** Check User's DB to Get Their Friend Data by passing 'friends'
    //    Then store updated array values in State
    // !* checkDBArrays is Used in Many Places Across the App and Will be Moved to a Context Utility with a More 
    //    Robust Switch Statement For Querying Many Types of DB Information With A Single Argument Passed To it
    const checkDBArrays = useCallback(async (arr) => {
        try {
            // * Make Request For IDs Stored In A Users Mongo Document
            const response = await fetch('/api/friends/arrays', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: _id, case: arr }),
                method: 'POST'
            });

            const data = await response.json();
            // console.log(data);
            // ** Determine How To Manage Requested Data in switch
            switch (arr) {
                case 'friends':
                    const friends = data.retUsers;
                    // ** Store All Friends In State
                    setAllFriends(friends);
                    // ** Check For and Store Active Rooms IDs
                    const activeRooms = [];
                    friends.forEach(fren => {
                        if (fren.activeRoom) {
                            activeRooms.push(fren.activeRoom);
                        } 
                    });
                    // console.log(activeRooms);
                    // ** Request Information For All Room IDs
                    const roomsRequest = await fetch('/api/room/findmany', {
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ids: activeRooms }),
                        method: 'POST'
                    });
                    const roomsResponse = await roomsRequest.json();
                    // ** Store Returned Data in State
                    setRoomsData(roomsResponse.data);
                    break;
                default:
                    console.log('No valid array');
                    break;
            }
        } catch (err) {
            console.log({ err });
        }
    }, [_id]);

    // * On Page Load, Make A Request For DB Info On User's Friends
    useEffect(() => {
        checkDBArrays('friends');
    }, [checkDBArrays]);


    return (
        <Container fluid className='d-flex flex-column ml-auto'>
            <Container className='mt-3 p-4' style={{backgroundColor: 'greenyellow'}}>
                <Row >
                    <Col className='text-center pb-2 mb-4'>
                        <h3>Create A Room</h3>
                    </Col>
                </Row>

                <Row className='d-flex justify-content-center mx-5'>
                    {/* RoomCarousel Component */}    
                    <RoomCarousel />
                    {/* CreateRoom Component */}          
                    <CreateRoom
                        allFriends={allFriends}
                    />
                </Row>
            </Container>

            <Container className='p-3 HomeFriendRoomCont'> 
                {/* FriendsRoom Component */}    
                <FriendsRoom
                    roomsData={roomsData}
                />
            </Container>
        </Container>
    );
};

export default Homepage;