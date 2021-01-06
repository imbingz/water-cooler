import React, {useState} from 'react';
import TabDmChats from '../TabDmChats';
import {AiOutlineClose} from 'react-icons/ai';
import friends from '../../data/friends';
import './TabDM.css';
import {v4 as uuidv4} from 'uuid';

function TabDM() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);


    return (
        <section className='my-4 mx-3 TabDM-section'>
                
            { friends &&
            friends.map(friend => (
                <div className='d-flex flex-row justify-content-start' key={uuidv4()}>  
                    <img src={friend.imageSrc} alt={friend.username} style={{width:32, height: 32}}/>
                    <p className='mx-2' >{friend.username}</p>
                    <button 
                        className='TabDM-view-chat-btn d-inline-block ml-auto mb-3 px-2 py-1' 
                        onClick={showSidebar} 
                    ><small> View Chat</small> </button>
                </div>                   
            ))
            }

            <aside className={sidebar ? 'Sidenav-menu-dm active' : 'Sidenav-menu-dm'}>
                <div className='Sidenav-menu-items-dm' >
                    <div className='Sidenav-toggle-dm' >
                        <div className='d-flex align-items-center'>
                            <img 
                                className='Sidenav-header-img'
                                src='/assets/images/logo-50.png' alt='default-avatar'/>
                            <h6 className='text-muted'>The-king</h6>
                        </div>
                        <button className='Sidenav-header-close-btn'>
                            <AiOutlineClose size={30} style={{fill: 'orangered'}} onClick={showSidebar}/>
                        </button>
                    </div>
                    <TabDmChats />
                </div>
                
            </aside>
        </section>
    );
}

export default TabDM;
