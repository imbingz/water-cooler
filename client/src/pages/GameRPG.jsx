import React, { useState, useEffect } from 'react';
import Map from '../components/Map';


function Game() {

    const tilesetData = require('../data/tilesets.json');

    const tilesets = Object.keys(tilesetData).map(set => ({
        type: 'group',
        // name: set.split("-").join(" "),
        name: set.replace(/-/g, ' '),
        items: tilesetData[set].variants.map(variant => ({
            value: `${set}/${variant}`,
            label: variant
        }))
    }));

    // tiles for our map - []
    const [tiles, setTiles] = useState([]);

    //manage tileset selection - with a default path to spring image
    const [tileset, setTileset] = useState('rpg-nature-tileset/spring');

    const [tileWidth, tileHeight] = [30, 30];
    // const [tileSize, setTitleSize] = useState({ tileWidth, tileHeight });

    const [tilesetGroup,] = tileset.split('/');

    //use tilesetGroup and tilesetData to get the size
    const { width, height } = tilesetData[tilesetGroup].size;


    useEffect(() => {
        //underscore here only signify that this varialbe will only be used inside of this code block.
        const _tiles = [];
        let id = 0;
        for (let y = 0; y < Math.round(height / 32 * tileHeight); y = y + tileHeight) {
            const row = [];
            for (let x = 0; x < Math.round(width / 32 * tileWidth); x = x + tileWidth) {
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
            style={ {
                position: 'relative',
                width: Math.round(width / 32 * tileWidth),
                height: Math.round(height / 32 * tileHeight),
                backgroundColor: 'grey',
                overflow: 'hidden',
                border: ' 1px solid black',
                margin: '10px auto'
            } }>

            <Map
                tileset={ tileset }
                tilesets={ tilesets }
                tiles={ tiles }
                setTiles={ setTiles }
                setTileset={ setTileset }
                tileWidth={ tileWidth }
                tileHeight={ tileHeight }
            />
        </div>
    );
}

export default Game;
