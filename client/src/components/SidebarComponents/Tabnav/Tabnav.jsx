import React, { useCallback, useEffect, useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import TabDM from '../TabDM';
import TabFriends from '../TabFriends';
import TabMembers from '../TabMembers';
import TabRoomChats from '../TabRoomChats';
import './Tabnav.css';



function Tabnav() {
    const [activeKey, setActiveKey] = useState('friends');


    const [roomData, setRoomData] = useState([]);
    const [spaceData, setSpaceData] = useState([]);

    // const getSpaceData = useCallback(async (roomId) => {
    //     console.log(roomData.socialSpaces);
    //     try {
    //         const request = await fetch('/api/socialspace/findmany', {
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ ids: roomData.socialSpaces }),
    //             method: 'POST'
    //         });

    //         const response = await request.json();
    //         console.log(response);
    //     } catch (err) {
    //         console.log({ err });
    //     }
    // }, [roomData.socialSpaces]);

    const getRoomData = useCallback(async (roomId) => {
        try {
            const roomRequest = await fetch('/api/room/find', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: '5ffbb507c16257281435863d' }),
                method: 'POST'
            });

            const roomResponse = await roomRequest.json();
            await setRoomData(roomResponse.data);

            const spacesRequest = await fetch('/api/socialspace/findmany', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: roomResponse.data.socialSpaces }),
                method: 'POST'
            });

            const spaceResponse = await spacesRequest.json();
            // console.log(spaceResponse);
            // setSpaceData(spaceResponse.data);
            // console.log(spaceResponse.data);
            parseSpaceResponse(spaceResponse.data);

        } catch (err) {
            console.log({ err });
        }
    }, []);

    const parseSpaceResponse = (arr) => {
        let parsedSpaceData = [];
        arr.forEach(async (space, index) => {

            const request = await fetch('/api/room/users', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ users: space.socialSpaceUsers }),
                method: 'POST'
            });

            const response = await request.json();
            // console.log('social users');
            // console.log(response.retUsers);

            let socialSpace = {
                publicRoomId: space.publicRoomId,
                socialSpaceName: space.socialSpaceName,
                publicSocialSpaceId: space.publicSocialSpaceId,
                socialSpaceUsers: response.retUsers
            };

            parsedSpaceData.push(socialSpace);
            // console.log(parsedSpaceData);
        });
        setSpaceData(parsedSpaceData);
    };

    const path = window.location.pathname;
    console.log(path);
    // eslint-disable-next-line
    const roomCheck = path.includes('room');
    // eslint-disable-next-line
    const spaceCheck = path.includes('space');


    // * On Page Load, Check DB for Any Changes in User's friend and inboundPendingFriends Arrays 
    useEffect(() => {
        getRoomData();
    }, [getRoomData]);




    return (
        // !* Hard coding style={{width: '325px'}} was causing responsiveness issues
        <div className='d-flex flex-column Tabnav-aside-tab'>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey} >
                <Nav variant="tabs" className="justify-content-around bg-warning">
                    {/* {(roomCheck || spaceCheck) &&
                        <Nav.Item className='Tabnav-nav-item'>
                            <Nav.Link eventKey='chats' className='Tabnav-nav-link'>Chats</Nav.Link>
                        </Nav.Item>
                    }
                    {(roomCheck || spaceCheck) &&
                        <Nav.Item className='Tabnav-nav-item' >
                            <Nav.Link eventKey='members' className='Tabnav-nav-link'>Members</Nav.Link>
                        </Nav.Item >
                    } */}
                    <Nav.Item className='Tabnav-nav-item'>
                        <Nav.Link eventKey='chats' className='Tabnav-nav-link'>Chats</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='Tabnav-nav-item' >
                        <Nav.Link eventKey='members' className='Tabnav-nav-link'>Members</Nav.Link>
                    </Nav.Item >
                    <Nav.Item className='Tabnav-nav-item' >
                        <Nav.Link eventKey='friends' className='Tabnav-nav-link'>Friends</Nav.Link>
                    </Nav.Item >
                    <Nav.Item >
                        <Nav.Link eventKey='dms' className='Tabnav-nav-link'>DMs</Nav.Link>
                    </Nav.Item>

                </Nav>
                <Tab.Content>

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
