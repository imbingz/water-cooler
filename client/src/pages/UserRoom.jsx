import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../utils/GlobalContext';

const UserRoom = () => {
  // const [state, dispatch] = useGlobalContext();

  // useEffect(() => {
  //   async function fetchRooms() {
  //     try {
  //       const response = await fetch('/api/room');
  //       const json = await response.json();
  //       dispatch({ type: 'addRooms', payload: json.data });
  //     } catch (err) {
  //       console.log({ err })
  //     }
  //   }
  //   fetchRooms();
  // }, [dispatch]);

  return (
    <>
      <h1>This is the UserRoom page</h1>
      <div>
        <h3>Room Info</h3>

        <button>
          Test
        </button>

        {/* <ul>
        {state.rooms.map(room => (
          <li id={room._id} key={room._id}>
            <button onClick={routeToRoom}>
              {room.name}
            </button>
          </li>
        ))}
      </ul> */}
      </div>
    </>
  );
};

export default UserRoom;