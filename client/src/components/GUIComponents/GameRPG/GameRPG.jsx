import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../utils/GlobalContext';
import Map from '../Map';


//For the map responsiveness 
function debounce(fn,ms) {
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

    const [dimensions, setDimensions] = useState({ 
        height: window.innerHeight,
        width: window.innerWidth
    });

    // tiles for our map - []
    const [tiles, setTiles] = useState([]);

 
    // set default tileSize 
    const [tileSize, setTileSize] = useState({ width: 32, height: 32});
  
    // Handle window resize event 
    useEffect(() => {
        const debouncedHandleResize = debounce(() => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });

            setTileSize({
                height: (window.innerHeight > 1000 ? 1000 : window.innerHeight) /38 + 5,
                width:  (window.innerWidth > 850 ? 850 : window.innerWidth) /38 + 5
            });
        }, 100);
  
        window.addEventListener('resize', debouncedHandleResize);
  
        //clean up
        return _ => {
            window.removeEventListener('resize', debouncedHandleResize);
      
        };
    }, [dimensions]);

    const tilesetData = require('../../../data/tilesets.json');

    const tilesets = Object.keys(tilesetData).map(set => ({
        type: 'group',
        // name: set.split("-").join(" "),
        name: set.replace(/-/g, ' '),
        items: tilesetData[set].variants.map(variant => ({
            value: `${set}/${variant}`,
            label: variant
        }))
    }));

    const [{roomStyle}, ] = useGlobalContext();

    //manage tileset selection - with a default path to spring image
    const [tileset, setTileset] = useState(`choose-a-tileset/${roomStyle}`);

    useEffect(() => {
        //underscore here only signify that this varialbe will only be used inside of this code block.
        const _tiles = [];
        let id = 0;
        for (let y = 0; y < (window.innerHeight - 100); y = y + tileSize.height) {
            const row = [];
            for (let x = 0; x < (window.innerWidth > 1000 ? 1000 : (window.innerWidth - 100)); x = x + tileSize.width) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            style={{
                position: 'relative',
                width:  (window.innerWidth > 1000) ? 1000 : (window.innerWidth - 100),
                height: window.innerHeight - 100,
                backgroundColor: 'white',
                overflow: 'hidden',
                border: ' 1px solid lightgrey',
                margin: '10px'
            }}>

            <Map
                tileset={ tileset }
                tilesets={ tilesets }
                tiles={ tiles }
                setTiles={ setTiles }
                setTileset={ setTileset }
                tileWidth={ tileSize.width}
                tileHeight={ tileSize.height }
            />
        </div>
    );
}

export default Game;
