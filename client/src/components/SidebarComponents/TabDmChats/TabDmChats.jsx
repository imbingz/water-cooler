import React from 'react';
import { BiSmile } from 'react-icons/bi';
import { IoIosSend } from 'react-icons/io';
import dmChats from '../../../data/dmchats';
import {v4 as uuidv4} from 'uuid';
import './TabDmChats.css';



function TabDmChats() {
    return (
        <article className='TabDmChats-chat-wrapper d-flex flex-column'>

            <section className='TabDmChats-chat-body mt-3 mx-3'>
                {
                    dmChats.map(dmchat => (
                        <div key={uuidv4()} className={dmchat.label==='you' ? 'TabDmChats-chat-you' : 'TabDmChats-chat-friend'}>
                            <p className=' mb-1 text-muted '>
                                {dmchat.label==='you' ? 'You' : 'Friend'}
                                <small className='ml-1'>
                                    {dmchat.timeStamp}
                                </small>
                            </p>
                            <p className={dmchat.label==='you' ? 'TabDmChats-chat-msg-you px-3' : 'TabDmChats-chat-msg-friend px-3'}>
                                {dmchat.msg} 
                            </p>
                        </div>
                    ))
                }

            </section>
            
            <section className='TabDmChats-chat-footer pt-3 px-2 pb-1'>
                <form>
                    <label htmlFor='dm-chat-input'>
                        <BiSmile size={25} style={{fill: 'black'}}/>
                    </label>

                    <input 
                        className='TabDmChats-chat-input'
                        type="text" 
                        id='dm-chat-input'
                        name='dm-chat-input'
                        placeholder='Type a message'
                    />

                    <button 
                        className='TabDmChats-chat-btn'
                        type='submit'
                    >
                        <IoIosSend size={23} style={{fill: '#08f'}}/>
                    </button>
                   
                </form>
            </section>
            
        </article>
    );
}

export default TabDmChats;
