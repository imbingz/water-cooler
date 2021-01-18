import React, { useState, useEffect } from 'react';
import Map from '../Map';
import { useGlobalContext } from '../../../utils/GlobalContext';

//For the map responsiveness 
function debounce(fn, ms) {
    let timer;
    return _ => {
        clearTimeout(timer);
        timer = setTimeout(_ => {
            timer = null;
            fn.apply(this, arguments);
        }, ms);
    };
}

function Game() {
    const [{ roomStyle },] = useGlobalContext();
    const [dimensions, setDimensions] = useState({ width: 825, height: 625 });
    const tileSize = { width: 32, height: 32 };
    // tiles for our map - []
    const [tiles, setTiles] = useState([]);

    // Handle window resize event 
    useEffect(() => {
        const debouncedHandleResize = debounce(() => {
            setDimensions({
                height: window.innerHeight >= 625 ? 625 : window.innerHeight - 100,
                width: window.innerWidth >= 825 ? 850 : window.innerWidth - 100
            });

        }, 100);

        window.addEventListener('resize', debouncedHandleResize);

        //clean up
        return _ => {
            window.removeEventListener('resize', debouncedHandleResize);

        };
    }, [dimensions]);

    // create tile []
    useEffect(() => {
        //underscore here only signify that this varialbe will only be used inside of this code block.
        const _tiles = [];
        let id = 0;

        for (let y = 0; y < 625; y = y + 32) {
            const row = [];
            for (let x = 0; x < 800; x = x + 32) {
                //push the row an obj with x, y, id
                row.push({
                    id: id++,
                    x,
                    y,
                    v: { x: -32, y: -32 }
                });
            }

            _tiles.push(row);
        }

        setTiles(_tiles);
    }, []);

    return (
        <div
            style={{
                position: 'relative',
                width: dimensions.width,
                height: dimensions.height,
                maxWidth: 825,
                maxHeight: 625,
                backgroundColor: 'white',
                overflow: 'hidden',
                border: ' 1px solid lightgrey',
                margin: '10px 20px'

            }}>

            <Map
                tileset={roomStyle}
                tiles={tiles}
                tileWidth={tileSize.width}
                tileHeight={tileSize.height}
            />
        </div>
    );
}

export default Game;
