import React from 'react';
import Dropdown from 'react-dropdown';
import io from 'socket.io-client';
import Player from '../Player';
import 'react-dropdown/style.css';

/******************************* ALEX */
// let socket;

// if (!socket) {
//     socket = io('http://localhost:8080', {
//         transports: ['websocket']
//     }); //this is the  client connection. it starts when client connects
// }
/*********************************** */

function Map({ tiles, tileset, tilesets, setTileset, tileHeight, tileWidth }) {

    /******************************* ALEX  */
    const [player, setPlayer] = React.useState(null);
    const [players, setPlayers] = React.useState({});

    /***************************** Bing 
     new player  obj is :
    {"id":"0aYC7eFLb9qfs_F4AAAN","name":0.42344489395629115}
    ***************/
    const [greeting, setGreeting] = React.useState('');


    // React.useEffect(() => {
    //     socket.on('connect', () => {
    //         console.log('hit connect');
    //         setPlayer({ id: socket.id, name: Math.random() });
    //         console.log(`socket.id is ${socket.id}`);
    //     });

    //     socket.on('connect_error', err => {
    //         console.log(err);
    //     });


        /********************************
       state plyrs: {"VEf-RG4xQsUqPWgpAAAF":{"x":0,"y":0},"QONco2PVTxzwGBjsAAAL":{"x":0,"y":0},"BiKQtjhxPP6g2fCFAAAN":{"x":255,"y":100},"ILWM32u5CTcQ6WWIAAAP":{"x":204,"y":427},"xWvlzx5m98uL4TvjAAAX":{"x":292,"y":264},"YhN8HnUv51JGxliaAAAZ":{"x":407,"y":234}}
        * *************************** */

    //     socket.on('state', (state) => {
    //         if (!state) { return; } console.log(state);
    //         const { players, message } = state;
    //         console.log(`state plyrs: ${JSON.stringify(players)}`);
    //         setPlayers(players);
    //         if (message) { setGreeting(message); }
    //         else { setGreeting(''); }
    //     });

    //     socket.on('greeting', msg => {
    //         console.log(msg);
    //         setGreeting(msg);
    //     });
    // }, []);


    React.useEffect(() => {
        if (player) {
            console.log(`hit palyer useEffect(): ${JSON.stringify(player)}`);
            // socket.emit('new player', player);
        }
    }, [player]);


    /*********************************** */


    return (
        <div
            style={ {
                position: 'absolute',
                border: '1px solid grey',
                top: 0,
                left: 0,
                zIndex: 5,
                backgroundColor: 'white'
            } }>

            {greeting && <h6> { greeting } </h6> }

            {Object.keys(players).map(key => {
                console.log(key, player.id);
                if (key === player.id) {
                    return (
                        <Player
                            pos={ players[key] }
                            // emitPos={ pos => socket.emit('movement', pos) }
                            message={players[key].message}
                        />
                    );
                }

                return (
                    <Player pos={ players[key] } />
                );
            }) }

            <div style={ { display: 'flex', justifyContent: 'center', padding: 10 } }>
                <div style={ { padding: 8 } }><span> Choose Room Settings </span></div>
                <div style={ { width: 200, marginLeft: 8 } }>
                    <Dropdown options={ tilesets } value={ tileset } onChange={ tileset => setTileset(tileset.value) } />
                </div>
            </div>

            {/* display tiles using map */ }
            {tiles.map((row, y) => (
                // each div is a row - inline style
                <div style={ { display: 'flex' } } key={ y }>
                    {row.map((tile, x) => (
                        <div
                            key={ tile.id }
                            style={ {
                                borderTop: '1px solid grey',
                                borderRight: '1px solid grey',
                                background: `url(/sprites/${tileset}.png)
								-${x * 32}px -${y * 32}px
								no-repeat`,
                                width: tileWidth,
                                height: tileHeight
                            } }
                        />
                    )) }
                </div>
            )) }
        </div>
    );

}

export default Map;