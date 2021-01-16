import React, { useState } from 'react';
import { BiSmile } from 'react-icons/bi';
import { IoIosSend } from 'react-icons/io';
import { SocketUse } from '../../../utils/SocketUseProvider';
import './TabRoomChats.css';

function TabRoomChats() {
    const [messageInput, setMessageValue] = useState('');
    const roomPageUrl = document.URL;
    const roomUrlId = roomPageUrl.substring((roomPageUrl.length) - 36);
    const userId = JSON.parse(localStorage.getItem('USER'))._id;
    const username = JSON.parse(localStorage.getItem('USER')).username;
    const { sendChat, roomChat } = SocketUse();

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            sendChat(messageInput, roomUrlId, userId, username);
            setMessageValue('');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <article className='TabRoomChats-chat-wrapper d-flex flex-column'>

                <section className='TabRoomChats-chat-body mt-3 mx-3'>
                    {
                        roomChat.map((chat) => (
                            <div key={chat._id} className={chat.username===username ? 'TabDmChats-chat-you' : ''}>
                                <p className=' mb-1 text-muted TabRoomChats-chat-username'>
                                    {chat.username===username ? 'You' : chat.username}
                                    <small className='ml-1'>
                                        {chat.timestamp}
                                    </small>
                                </p>
                                <p className={chat.username===username ? 'TabRoomChats-chat-msg-you px-3 py-1' : 'TabRoomChats-chat-msg px-3 py-1'}>
                                    {chat.message} 
                                </p>
                            </div>
                        ))
                    }

                </section>

                <section className='TabRoomChats-chat-footer p-3'>
                    <form >
                        <label
                            htmlFor='room-chat-input'
                        >
                            <BiSmile size={25} style={{fill: 'black'}}/>
                        </label>

                        <input 
                            required
                            className='TabRoomChats-chat-input'
                            type="text" 
                            id='room-chat-input'
                            name='messageInput'
                            value={messageInput}
                            onChange={(e) => setMessageValue(e.target.value)}
                            placeholder='Type a message'
                        />

                        <button 
                            className='TabRoomChats-chat-btn'
                            type='submit'
                            onClick={sendMessage}
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
