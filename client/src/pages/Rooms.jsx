import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalContext';


const Rooms = () => {
    const [state, dispatch] = useGlobalContext();
    const [inputRoomName, setRoomName] = useState('');
    
    const history = useHistory();
    
    useEffect(() => {
        async function fetchRooms() {
            try {
                const response = await fetch('/api/room');
                const json = await response.json();
                dispatch({ type: 'getAll', payload: json.data });
            } catch (err) {
                console.log({ err });
            }
        }
        fetchRooms();
    }, [dispatch]);
    
    const createRoom = async (e) => {
        e.preventDefault();
        const { v4: uuidv4 } = require('uuid');
        const roomUrlId = uuidv4();
        try {
            const response = await fetch(
                '/api/room/create',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        roomName: inputRoomName,
                        publicRoomId: roomUrlId
                    }),
                    method: 'POST'
                }
            );
            const json = await response.json();
            dispatch({ type: 'createRoom', payload: json.data });
            setRoomName('');
            history.push('/rooms/' + roomUrlId);
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        }
    };

    const routeToRoom = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                '/api/room/find',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: document.activeElement.parentElement.id
                    }),
                    method: 'POST'
                }
            );
            const json = await response.json();
            const roomUrlId = json.data.publicRoomId;
            history.push('/rooms/' + roomUrlId);
            window.location.reload(false);
        } catch (err) {
            console.log({ err });
        }
    };

    return (
        <>
            <div>
                <h1>Create a Room</h1>
                <form onSubmit={createRoom}>
                    <input
                        required
                        type='text'
                        name='inputRoomName'
                        value={inputRoomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                    <button>Create Room</button>
                </form>
            </div>
            <div>
                <h3>Open Rooms</h3>
                <ul>
                    {state.rooms.map(room => (
                        <li id={room._id} key={room._id}>
                            <button onClick={routeToRoom}>
                                {room.roomName}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Rooms;