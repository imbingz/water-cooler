import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import SidebarUsersCont from '../SidebarUsers';
import TabDmChats from '../TabDmChats';
import dummyFriends from '../../../data/friends';
import './TabDM.css';

function TabDM(props) {

    
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    // * Render Dummy Or DB Data
    // ** A Yes Value will Render The DOM with Data From Data Folder, Changing this to 'no' Will Render DOM with DB Data
    let dummyData = 'yes';
    let renderAllFriends;

    switch (dummyData) {
        case 'yes':
            renderAllFriends = dummyFriends;

            break;
        default:
            renderAllFriends = props.allFriends;
    }

    return (
        <section className='my-4 mx-3 TabDM-section'>

            <SidebarUsersCont
                data={renderAllFriends}
                type="dm"
                isRequest={false}
                showSidebar={showSidebar}
            />

            <aside className={sidebar ? 'Sidenav-menu-dm active' : 'Sidenav-menu-dm'}>
                <div className='Sidenav-menu-items-dm' >
                    <div className='Sidenav-toggle-dm' >
                        <div className='d-flex align-items-center'>
                            <img
                                className='Sidenav-header-img'
                                src='/assets/images/logo-50.png' alt='default-avatar' />
                            <h6 className='text-muted'>The-king</h6>
                        </div>
                        <button className='Sidenav-header-close-btn'>
                            <AiOutlineClose size={30} style={{ fill: 'orangered' }} onClick={showSidebar} />
                        </button>
                    </div>
                    <TabDmChats 
                    
                    />
                </div>

            </aside>
        </section>
    );
}

export default TabDM;
