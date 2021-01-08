import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import TabDM from '../TabDM';
import TabFriends from '../TabFriends';
import './Tabnav.css';


function Tabnav() {
    const [activeKey, setActiveKey] = useState('friends');
    return (
        <div style={{width: '325px'}} className='d-flex flex-column Tabnav-aside-tab'>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey} >
                <Nav variant="tabs" className="justify-content-center bg-warning">
                    <Nav.Item className='Tabnav-nav-item' >
                        <Nav.Link eventKey='friends' className='Tabnav-nav-link'>Friends</Nav.Link>
                    </Nav.Item >
                    <Nav.Item >
                        <Nav.Link eventKey='dms' className='Tabnav-nav-link'>DMs</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
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
