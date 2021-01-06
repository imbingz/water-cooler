import React from 'react';
import './TabDmChats.css';
import {BiSmile} from 'react-icons/bi';
import {IoIosSend} from 'react-icons/io';

import dmChats from '../../data/dmchats';


function TabDmChats() {
    return (
        <article className='TabDmChats-chat-wrapper d-flex flex-column'>

            <section className='TabDmChats-chat-body mt-3 mx-3'>
                {
                    dmChats.map(dmchat => (
                        <div className={dmchat.label==='you' ? 'TabDmChats-chat-you' : 'TabDmChats-chat-friend'}>
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
            
            <section className='TabDmChats-chat-footer mt-2 pt-3 px-2'>
                <form onSumbit={(e)=> e.preventDefault()}>
                    <label htmlFor='dm-chat-input'>
                        <BiSmile size={25} style={{fill: 'black'}}/>
                    </label>

                    <input 
                        className='TabDmChats-chat-input'
                        type="text" 
                        id='dm-chat-input'
                        name='dm-chat-input'
                        placeholder='Type a messagees'
                    />

                    <button 
                        className='TabDmChats-chat-btn'
                        type='submit'
                        onClick = {(e) => {
                            e.preventDefault();
                            console.log('send chat');}}
                    >
                        <IoIosSend size={23} style={{fill: '#08f'}}/>
                    </button>
                   
                </form>
            </section>
            
        </article>
    );
}

export default TabDmChats;
