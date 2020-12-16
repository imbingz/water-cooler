import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../utils/GlobalContext';

const Rooms = () => {
  const [state, dispatch] = useGlobalContext();
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch('/api/room');
        const json = await response.json();
        console.log({ json })

        dispatch({ type: 'addRooms', payload: json.data });
      } catch (err) {
        console.log({ err })
      }
    }

    fetchRooms();
  }, []);

  const createRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        '/api/room/create',
        {
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: roomName }),
          method: 'POST'
        }
      );
      const json = await response.json();
      console.log(json);

      dispatch({ type: 'createRoom', payload: json.data });
      setRoomName('');
    } catch (err) {
      console.log(err);
    }
  };


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
          <li key={room._id}>
            <span>
              {room.name}
            </span>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
};

export default Rooms;