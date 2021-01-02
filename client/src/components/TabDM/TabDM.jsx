import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai';
import friends from '../../data/friends';
import './TabDM.css';
import {v4 as uuidv4} from 'uuid';

function TabDM() {
    const [sidebar, setSidebar] = useState(true);
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

            <aside className={sidebar ? 'Sidenav-menu active' : 'Sidenav-menu'}>
                <div className='Sidenav-menu-items d-flex flex-column' >
                    <div onClick={showSidebar}className='Sidenav-toggle' >
                        <Link to='#' className='Header-menu-bars'>
                            <AiOutlineClose />
                        </Link>
                    </div>
                    {/* <Tabchat /> */}
                </div>
                
            </aside>
        </section>
    );
}

export default TabDM;
