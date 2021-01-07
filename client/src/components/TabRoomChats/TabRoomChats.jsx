import React from 'react';
import {BiSmile} from 'react-icons/bi';
import {IoIosSend} from 'react-icons/io';
import './TabRoomChats.css';
import roomChats from '../../data/roomChats';
import {v4 as uuidv4} from 'uuid';

function TabRoomChats() {
    return (
        <>
            <article className='TabRoomChats-chat-wrapper d-flex flex-column'>

                <section className='TabRoomChats-chat-body mt-3 mx-3'>
                    {
                        roomChats.map((roomchat) => (
                            <div key={uuidv4()} className={roomchat.username==='eclarke' ? 'TabDmChats-chat-you' : ''}>
                                <p className=' mb-1 text-muted TabRoomChats-chat-username'>
                                    {roomchat.username==='eclarke' ? 'You' : roomchat.username}
                                    <small className='ml-1'>
                                        {roomchat.timeStamp}
                                    </small>
                                </p>
                                <p className={roomchat.username==='eclarke' ? 'TabRoomChats-chat-msg-you px-3 py-1' : 'TabRoomChats-chat-msg px-3 py-1'}>
                                    {roomchat.msg} 
                                </p>
                            </div>
                        ))
                    }

                </section>

                <section className='TabRoomChats-chat-footer pt-3 pl-4'>
                    <form >
                        <label htmlFor='room-chat-input'>
                            <BiSmile size={25} style={{fill: 'black'}}/>
                        </label>

                        <input 
                            className='TabRoomChats-chat-input'
                            type="text" 
                            id='room-chat-input'
                            name='room-chat-input'
                            placeholder='Type a message'
                        />

                        <button 
                            className='TabRoomChats-chat-btn'
                            type='submit'
                        >
                            <IoIosSend size={23} style={{fill: '#08f'}}/>
                        </button>
       
                    </form>
                </section>

            </article>
        </>
    );
}

export default TabRoomChats;
