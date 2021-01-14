import React, { useCallback, useEffect, useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import TabDM from '../TabDM';
import TabFriends from '../TabFriends';
import TabMembers from '../TabMembers';
import TabRoomChats from '../TabRoomChats';
import './Tabnav.css';


// * TabNav Handles Changes Sidebar Tabs, Requests and Parses DB Data, and Sends Data to It's Child Components
function Tabnav() {

    // * Set States, State Helper Functions, and Other Variables

    // !* Depreciated - We need to pull this from global context instead
    const { _id } = JSON.parse(localStorage.getItem('USER'));

    // ** For Rendering a Tab, Default to Friends Tab
    const [activeKey, setActiveKey] = useState('friends');


    // ** Variables To Determine It TabMembers and Tab Chat Should Render
    const path = window.location.pathname;
    const roomCheck = path.includes('room');
    const spaceCheck = path.includes('space');


    // * Collect and Parse Data for TabMembers
    // ** Store Data in State
    //  Default state for roomData Needs to Send an Empty Array Since the jsx in Tab Members Uses .map
    const [roomData, setRoomData] = useState(
        {
            roomUsers: []
        });
    const [spaceData, setSpaceData] = useState([]);

    // ** Request Information for Current Room and It's Social Spaces
    const getRoomData = useCallback(async (roomId) => {
        try {
            // *** Make Post Req By Sending Room ID
            const roomRequest = await fetch('/api/room/find', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: '5ffea352af50db836c5cbdbc' }),
                method: 'POST'
            });

            const roomResponse = await roomRequest.json();
            // console.log(roomResponse.data);
            // *** If DB Req Is Successful, Store Room Data in State and Request Information for Social Spaces
            if (roomResponse.data) {
                setRoomData(roomResponse.data);

                const spacesRequest = await fetch('/api/socialspace/findmany', {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ids: roomResponse.data.socialSpaces }),
                    method: 'POST'
                });
                const spaceResponse = await spacesRequest.json();
                // console.log(spaceResponse);
                parseSpaceResponse(spaceResponse.data);
            }
        } catch (err) {
            console.log({ err });
        }
    }, []);

    // ** Get User Information for Each Social Space and Parse Data for TabMembers To Render
    const parseSpaceResponse = (arr) => {
        let parsedSpaceData = [];
        arr.forEach(async (space, index) => {
            // *** Make POST Req For Each User in Current Social Space By Sending an Array of User IDs
            const request = await fetch('/api/room/users', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ users: space.socialSpaceUsers }),
                method: 'POST'
            });

            const response = await request.json();
            // console.log(response.retUsers);
            // *** Create A New Object to Store Social Space Data with Response Data Containing 
            //      User's Information and Push Object To parsedSpaceData[]
            let socialSpace = {
                publicRoomId: space.publicRoomId,
                socialSpaceName: space.socialSpaceName,
                publicSocialSpaceId: space.publicSocialSpaceId,
                socialSpaceUsers: response.retUsers
            };
            parsedSpaceData.push(socialSpace);
            // console.log(parsedSpaceData);
        });
        // *** Store Parsed Information in State
        setSpaceData(parsedSpaceData);
    };


    // * Collect and Parse Data for TabFriends and TabDM

    // ** Store Data in State For TabFriends
    const [inpending, setInpending] = useState([]);
    const [offFriends, setOffFriends] = useState([]);
    // eslint-disable-next-line
    const [onFriends, setOnFriends] = useState([]);
    
    // ** Store Data in State for TabDM
    const [allFriends, setAllFriends] = useState([]);
    // ** Store Room Invite In State
    const [inpendingRooms, setInpendingRooms] = useState([]);

    // ** Check User's DB For Any Changes in either friends or inboundPendingFriends by passing 'friends' or 'inpending'
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
            switch (arr) {
                case 'friends':
                    // console.log('friends: ', data.retUsers);
                    const friends = data.retUsers;
                    setAllFriends(friends);
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
                case 'inpendingRooms':
                    // console.log('inpendingRooms: ', data.retRooms);
                    setInpendingRooms(data.retRooms);
                    break;
                default:
                    console.log('No valid array');
                    break;
            }
        } catch (err) {
            console.log({ err });
        }
    }, [_id]);


    // * On Page Load, Get Data For Friends, Friend Requests, Rooms, and Social Spaces
    useEffect(() => {
        getRoomData();
        checkDBArrays('friends');
        checkDBArrays('inpending');
        checkDBArrays('inpendingRooms');
    }, [checkDBArrays, getRoomData]);




    return (
        // !* Hard coding style={{width: '325px'}} was causing responsiveness issues
        <div className='d-flex flex-column Tabnav-aside-tab'>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey} >
                <Nav variant="tabs" className="justify-content-around bg-warning">
                    <Nav.Item>
                        <Nav.Link eventKey='friends' className='Tabnav-nav-link '>Friends</Nav.Link>
                    </Nav.Item >
                    <Nav.Item>
                        <Nav.Link eventKey='dms' className='Tabnav-nav-link '>DMs</Nav.Link>
                    </Nav.Item>

                    {/* ** Check if User is in A Room or Social Space Before Rendering Tab Option */}
                    {(roomCheck || spaceCheck) &&
                        <Nav.Item>
                            <Nav.Link eventKey='chats' className='Tabnav-nav-link'>Chats</Nav.Link>
                        </Nav.Item>
                    }
                    {(roomCheck || spaceCheck) &&
                        <Nav.Item>
                            <Nav.Link eventKey='members' className='Tabnav-nav-link '>Members</Nav.Link>
                        </Nav.Item >
                    }

                    {/* !* These two Container Will Always Render Members and Chat, Even When Not in a Room or Space for Development */}
                    {/* <Nav.Item className='Tabnav-nav-item'>
                        <Nav.Link eventKey='chats' className='Tabnav-nav-link'>Chats</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='Tabnav-nav-item' >
                        <Nav.Link eventKey='members' className='Tabnav-nav-link'>Members</Nav.Link>
                    </Nav.Item > */}

                </Nav>

                <Tab.Content className='plz-work'>
                    <Tab.Pane eventKey='friends'>
                        <TabFriends
                            inpending={inpending}
                            inpendingRooms ={inpendingRooms}
                            offFriends={offFriends}
                            checkDBArrays={checkDBArrays}
                        />
                    </Tab.Pane>
                    <Tab.Pane eventKey='dms'>
                        <TabDM
                            allFriends={allFriends}
                        />
                    </Tab.Pane>
                    <Tab.Pane eventKey='chats'>
                        <TabRoomChats />
                    </Tab.Pane>
                    <Tab.Pane eventKey='members'>
                        <TabMembers
                            roomData={roomData}
                            spaceData={spaceData}
                        />
                    </Tab.Pane>
                </Tab.Content>

            </Tab.Container>
        </div>
    );
}

export default Tabnav;
