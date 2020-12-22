import React from 'react';

function Map({ tiles, tileset, size, activeTile, setTiles, bgTile }) {
    //define dropTile for onClick event -
    //need to first clone the previous matrix (map) because we have to work on it immutably, meaning we cannot just edit the previous matrix state. we need to clone the previouse matrix state and then alter that copy and set the tile back to that copy

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
            {/* background layer  */ }
            <div style={ { position: 'absolute', zIndex: 1 } }>
                { tiles.map((row, y) => (
                    <div style={ { display: 'flex' } } key={ y }>
                        {row.map((tile, x) => (
                            <div
                                onClick={ () => {
                                    // console.log('tile clicked:', { tile });
                                    dropTile({ x, y });
                                } }
                                key={ tile.id }
                                style={ {
                                    borderTop: '1px solid black',
                                    borderRight: '1px solid black',
                                    // background: `-${tile.v.x * 32}px -${tile.v.y * 32}px
                                    // no-repeat`,
                                    background: `url(/sprites/${tileset}.png)
                                    -${bgTile.x}px -${bgTile.y}px no-repeat`,
                                    // background: `-${tile.v.x}px -${tile.v.y}px no-repeat`,
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
                                    // console.log('tile clicked:', { tile });
                                    dropTile({ x, y });
                                } }
                                key={ tile.id }
                                style={ {
                                    borderTop: '1px solid black',
                                    borderRight: '1px solid black',
                                    // background: `-${tile.v.x * 32}px -${tile.v.y * 32}px
                                    // no-repeat`,
                                    background: `url(/sprites/${tileset}.png)
                                      -${tile.v.x}px -${tile.v.y}px no-repeat`,
                                    // background: `-${tile.v.x}px -${tile.v.y}px no-repeat`,
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