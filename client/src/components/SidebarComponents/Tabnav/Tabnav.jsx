import React, { useCallback, useEffect, useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import TabDM from '../TabDM';
import TabFriends from '../TabFriends';
import TabMembers from '../TabMembers';
import TabRoomChats from '../TabRoomChats';
import './Tabnav.css';


// * TabNav Handles Changes Sidebar Tabs, Request and Parsed Data, and Sends Data to It's Child Components
function Tabnav() {

    // * Set States, State Helper Functions, and Other Variables
    // ** For Rendering a Tab, Default to Friends Tab
    const [activeKey, setActiveKey] = useState('friends');

    // ** Prop Data for Tab Members to Render
    //  Default state for roomData Needs to Send an Empty Array Since the jsx in Tab Members Uses .map
    const [roomData, setRoomData] = useState(
        {
            roomUsers: []
        });
    const [spaceData, setSpaceData] = useState([]);

    // ** Variables To Determine It TabMembers and Tab Chat Should Render
    const path = window.location.pathname;
    const roomCheck = path.includes('room');
    const spaceCheck = path.includes('space');
    

    // * Functions
    // ** Request Information for Current Room and It's Social Spaces
    const getRoomData = useCallback(async (roomId) => {
        try {
            // *** Make Post Req By Sending Room ID
            const roomRequest = await fetch('/api/room/find', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: '5ffbb507c16257281435863d' }),
                method: 'POST'
            });

            const roomResponse = await roomRequest.json();
            // console.log(roomResponse.data);
            // *** If DB Req Is Successful, Store Room Data in State and Request Information for Social Spaces
            if (roomResponse.success) {
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

    


    // * On Page Load, Get Data For Room and Social Spaces
    useEffect(() => {
        getRoomData();
    }, [getRoomData]);




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
                    <Tab.Pane eventKey='chats'>
                        <TabRoomChats />
                    </Tab.Pane>
                    <Tab.Pane eventKey='members'>
                        <TabMembers
                            roomData={roomData}
                            spaceData={spaceData}
                        />
                    </Tab.Pane>
                    <Tab.Pane eventKey='friends'>
                        <TabFriends />
                    </Tab.Pane>
                    <Tab.Pane eventKey='dms'>
                        <TabDM />
                    </Tab.Pane>

                </Tab.Content>

            </Tab.Container>
        </div>
    );
}

export default Tabnav;
