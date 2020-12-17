import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalContext';

const { v4: uuidv4 } = require('uuid');
const urlID = uuidv4();

const Rooms = () => {
    const [state, dispatch] = useGlobalContext();
    const [roomName, setRoomName] = useState('');

    const history = useHistory();

    useEffect(() => {
        async function fetchRooms() {
            try {
                const response = await fetch('/api/room');
                const json = await response.json();
                dispatch({ type: 'addRooms', payload: json.data });
            } catch (err) {
                console.log({ err })
            }
        }
        fetchRooms();
    }, [dispatch]);

    const createRoom = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                '/api/room/create',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: roomName,
                        publicID: urlID
                    }),
                    method: 'POST'
                }
            );
            const json = await response.json();
            dispatch({ type: 'createRoom', payload: json.data });
            setRoomName('');
            history.push('/rooms/' + urlID)
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
            const urlID = json.data.publicID;
            history.push('/rooms/' + urlID)
        } catch (err) {
            console.log({ err })
        }
    }

    return (
        <>
            <div>
                <h1>Create a Room</h1>
                <form onSubmit={createRoom}>
                    <input
                        required
                        type="text"
                        name="roomName"
                        value={roomName}
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
                                {room.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Rooms;