import React from 'react';
import io from 'socket.io-client';
import Player from '../../components/Player';

/******************************* ALEX */
let socket;


/*********************************** */

function Map({ tiles, tileset, size, activeTile, setTiles, bgTile }) {
    /******************************* ALEX  */
    const [player, setPlayer] = React.useState(null);
    const [players, setPlayers] = React.useState({});

    /***************************** Bing 
     new player  obj is :
    {"id":"0aYC7eFLb9qfs_F4AAAN","name":0.42344489395629115}
    ***************/
    const [greeting, setGreeting] = React.useState('');

    if (!socket) {
        socket = io('/', {
            transports: ['websocket']
        }); //this is the  client connection. it starts when client connects

        socket.on('connect', () => {
            console.log('hit connect');
            setPlayer({ id: socket.id, name: Math.random() });
            console.log(`socket.id is ${socket.id}`);
        });

        socket.on('connect_error', err => {
            console.log(err);
        });

        socket.on('state', (state) => {
            if (!state) { return; } console.log(state);
            const { players, message } = state;
            console.log(`state plyrs: ${JSON.stringify(players)}`);
            setPlayers(players);
            if (message) { setGreeting(message); }
            else { setGreeting(''); }
        });

        socket.on('greeting', msg => {
            console.log(msg);
            setGreeting(msg);
        });
    }
    
    

    /********************************
     state plyrs: {"VEf-RG4xQsUqPWgpAAAF":{"x":0,"y":0},"QONco2PVTxzwGBjsAAAL":{"x":0,"y":0},"BiKQtjhxPP6g2fCFAAAN":{"x":255,"y":100},"ILWM32u5CTcQ6WWIAAAP":{"x":204,"y":427},"xWvlzx5m98uL4TvjAAAX":{"x":292,"y":264},"YhN8HnUv51JGxliaAAAZ":{"x":407,"y":234}}
    * *************************** */

    React.useEffect(() => {
        if (player) {
            console.log(`hit palyer useEffect(): ${JSON.stringify(player)}`);
            socket.emit('new player', player);
        }
    }, [player]);



    /*********************************** */


    //define dropTile for onClick event -

    //clone matrix (see reason above)
    function cloneMatrix(m) {
        //create an empty array with given length of m
        const clone = new Array(m.length);
        // **** pre-increment i
        for (let i = 0; i < m.length; ++i) {
            //clone[i] = [ ...m[i] ]
            clone[i] = m[i].slice(0);
        }
        return clone;
    }

    function dropTile({ x, y }) {
        setTiles(prev => {
            //use cloneMatrix func to clone the matrix of previouse state, alter tile @x/y to the active tile
            const clone = cloneMatrix(prev);
            //swap tile with the activeTile
            const tile = {
                ...clone[y][x],
                v: activeTile
            };
            //actual swap
            clone[y][x] = tile;
            return clone;
        });
    }

    return (
        <div
            style={ {
                boxSizing: 'border-box',
                backgroundColor: 'white',
                overflow: 'hidden',
                width: size.width,
                height: size.height
            } }>

            {greeting && <h6> { greeting } </h6> }

            {Object.keys(players).map(key => {
                console.log(key, player.id);
                if (key === player.id) {
                    return (
                        <Player
                            skin='f1'
                            pos={ players[key] }
                            emitPos={ pos => socket.emit('movement', pos) }
                        />
                    );
                }

                return (
                    <Player skin='f1' pos={ players[key] } />
                );
            }) }

            {/* background layer  */ }
            <div style={ { position: 'absolute', zIndex: 1 } }>
                { tiles.map((row, y) => (
                    <div style={ { display: 'flex' } } key={ y }>
                        {row.map((tile, x) => (
                            <div
                                onClick={ () => {
                                    dropTile({ x, y });
                                } }
                                key={ tile.id }
                                style={ {
                                    borderTop: '1px solid black',
                                    borderRight: '1px solid black',
                                    background: `url(/sprites/${tileset}.png)
                                    -${bgTile.x}px -${bgTile.y}px no-repeat`,
                                    width: 32,
                                    height: 32
                                } }
                            />
                        )) }
                    </div>
                )) }
            </div>
            {/* Forefront layer */ }
            <div style={ { position: 'absolute', zIndex: 2 } }>
                { tiles.map((row, y) => (
                    <div style={ { display: 'flex' } } key={ y }>
                        {row.map((tile, x) => (
                            <div
                                onClick={ () => {
                                    dropTile({ x, y });
                                } }
                                key={ tile.id }
                                style={ {
                                    borderTop: '1px solid black',
                                    borderRight: '1px solid black',
                                    background: `url(/sprites/${tileset}.png)
                                      -${tile.v.x}px -${tile.v.y}px no-repeat`,
                                    width: 32,
                                    height: 32
                                } }
                            />
                        )) }
                    </div>
                )) }
            </div>
        </div>
    );
}

export default Map;