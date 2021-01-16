import React from 'react';
import { SocketUseProvider } from '../../../utils/SocketUseProvider';
import Player from '../Player';
import 'react-dropdown/style.css';

function Map({ tiles, tileset, tileHeight, tileWidth }) {

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

            <SocketUseProvider>
                <Player />
            </SocketUseProvider>

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
                                background: `url(${tileset})
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
