import React from 'react';
import Dropdown from 'react-dropdown';

import { useGUI } from '../../../utils/GUIProvider';
import Player from '../Player';
import 'react-dropdown/style.css';

function Map({ tiles, tileset, tilesets, setTileset, tileHeight, tileWidth }) {
    const { player, players, greeting, emitMovement } = useGUI();
    console.log(player, players);

    return (
        <div
            style={{
                position: 'absolute',
                border: '1px solid white',
                top: 0,
                left: 0,
                zIndex: 5,
                backgroundColor: 'white'
            }}>

            <h6> {greeting} </h6>

            {Object.keys(players).map(key => {
                console.log(key, player.id);
                if (key === player.id) {
                    return (
                        <Player
                            pos={players[key]}
                            emitPos={pos => emitMovement(pos)}
                            message={players[key].message}
                        />
                    );
                }

                return (
                    <Player pos={players[key]} />
                );
            })}

            <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
                <div style={{ padding: 8 }}><span> Choose Room Settings </span></div>
                <div style={{ width: 200, marginLeft: 8 }}>
                    <Dropdown options={tilesets} value={tileset} onChange={tileset => setTileset(tileset.value)} />
                </div>
            </div>

            {/* {/* display tiles using map */}
            {tiles.map((row, y) => (
                // each div is a row - inline style
                <div style={{ display: 'flex' }} key={y}>
                    {row.map((tile, x) => (
                        <div
                            key={tile.id}
                            style={{
                                borderTop: '1px solid grey',
                                borderRight: '1px solid grey',
                                background: `url(/sprites/${tileset}.png)
								-${x * 32}px -${y * 32}px
								no-repeat`,
                                width: tileWidth,
                                height: tileHeight
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );

}

export default Map;