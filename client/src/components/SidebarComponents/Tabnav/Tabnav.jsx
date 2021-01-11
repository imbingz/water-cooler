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

    const getRoomData = useCallback(async (roomId) => {
        try {
            const request = await fetch('/api/room/find', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: '5ffbb507c16257281435863d' }),
                method: 'POST'
            });

            const response = await request.json();
            await setRoomData(response.data);
        } catch (err) {
            console.log({ err });
        }
    }, []);





    // * On Page Load, Check DB for Any Changes in User's friend and inboundPendingFriends Arrays 
    useEffect(() => {
        getRoomData();
    }, [getRoomData]);


    return (
        // !* Hard coding style={{width: '325px'}} was causing responsiveness issues
        <div className='d-flex flex-column Tabnav-aside-tab'>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey} >
                <Nav variant="tabs" className="justify-content-around bg-warning">

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
