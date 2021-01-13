import React, { useCallback, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CreateRoom from '../components/HomepageComponents/CreateRoom';
import FriendsRoom from '../components/HomepageComponents/FriendsRoom';
import RoomCarousel from '../components/HomepageComponents/RoomCarousel';
import { useGlobalContext } from '../utils/GlobalContext';

const Homepage = () => {

    const [{ USER },] = useGlobalContext();
    const _id = USER._id;
    console.log(_id);
    

    // ** Check User's DB to Get Their Friend IDs by passing 'friends'
    //    Then store updated array values in State
    // !* This Should be Moved to a Sidebar Context Along with Associated States
    const checkDBArrays = useCallback(async (arr) => {
        try {
            const response = await fetch('/api/friends/arrays', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: _id, case: arr }),
                method: 'POST'
            });

            const data = await response.json();
            console.log(data);
            switch (arr) {
                case 'friends':
                    // console.log('friends: ', data.retUsers);
                    const friends = data.retUsers;
                    // ** Store All Friends In State
                    // setAllFriends(friends);

                    // ** Check for and Store Online and Offline Friends
                    // const offline = [];
                    // const online = [];
                    // friends.forEach(fren => {
                    //     (fren.status === 0) ? offline.push(fren) : online.push(fren);
                    // });
                    // setOffFriends(offline);
                    // setOnFriends(online);
                    // console.log({offline});

                    // ** Check For and Store Active Rooms
                    const activeRooms = [];
                    friends.forEach(fren => {
                        if (fren.activeRoom) {
                            console.log(fren.activeRoom);
                            activeRooms.push(fren.activeRoom);
                        } 
                    });
                    break;
                // case 'inpending':
                //     // console.log('inpending: ', data.retUsers);
                //     setInpending(data.retUsers);
                //     break;
                default:
                    console.log('No valid array');
                    break;
            }
        } catch (err) {
            console.log({ err });
        }
    }, [_id]);


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
                    <CreateRoom/>
                </Row>
            </Container>

            <Container className='my-5 p-3' style={{backgroundColor: '#0af'}}> 
                {/* FriendsRoom Component */}    
                <FriendsRoom/>
            </Container>
        </Container>
    );
};

export default Homepage;