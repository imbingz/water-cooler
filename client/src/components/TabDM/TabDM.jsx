import React from 'react';
import friends from '../../data/friends';
import './TabDM.css';
import {v4 as uuidv4} from 'uuid';

function TabDM() {
    return (
        <section className='my-4 mx-3 TabDM-section'>
                
            { friends &&
            friends.map(friend => (
                <div className='d-flex flex-row justify-content-start' key={uuidv4()}>  
                    <img src={friend.imageSrc} alt={friend.username} style={{width:32, height: 32}}/>
                    <p className='mx-2' >{friend.username}</p>
                    <button className='TabDM-view-chat-btn d-inline-block ml-auto mb-3 px-2 py-1'><small> View Chat</small> </button>
                </div>
                   
            ))
            }
        </section>
    );
}

export default TabDM;
