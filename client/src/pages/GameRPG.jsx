import React, { useState, useEffect } from 'react';
import useDraggable from '../utils/useDraggable';
import TilePalette from '../components/TilePalette';
import Map from '../components/Map';
import Player from '../components/Player';

function Game() {
    // use custom hook  draggable, passing  the name of the id we will use to drag as arg
    const { position } = useDraggable('handle');
    //manage tileset selection - with a default path to spring image
    const [tileset, setTileset] = useState('rpg-nature-tileset/spring');
    // tiles for our map - []
    const [tiles, setTiles] = useState([]);
    //map-size - obj - ultimatly this will be under toolbar component as a feature to change our map
    // const [mapSize, setMapSize] = useState({
    //     width: 800,
    //     height: 600
    // });
    const mapSize = { width: 800,height: 600};
    
    //set activeTile - the default state is whichever the tile we select
    const [activeTile, setActiveTile] = useState({ x: 1 * 32, y: 4 * 32 });

    //store background tile - initially set as off the map - no background
    const [bgTile, setBgTile] = useState({ x: -32, y: -32 });

    // here the codes inside only load once when the page load (comopnentDidMount)
    useEffect(() => {
        //underscore here only signify that this varialbe will only be used inside of this code block. 
        const _tiles = [];
        let id = 0;
        // similar to how we create a tile matrix, using a nested for...loop
        for (let y = 0; y < mapSize.height; y = y + 32) {
            const row = [];
            for (let x = 0; x < mapSize.width; x = x + 32) {
                //push the row an obj with x, y, id
                row.push({
                    id: id++,
                    x,
                    y,
                    v: { x: -32, y: -32 } // track v as value key, pointing towards the exact same dimension on the tile-palette so that we know which tile we are pointing to. since the map starts as empty, we set the v as 32, 32
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
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: 'grey',
                overflow: 'hidden',
                border: ' 1px solid black'
            } }>
            <TilePalette
                tileset={ tileset }
                position={ position }
                activeTile={ activeTile }
                setActiveTile={ setActiveTile }
                setTileset={ setTileset }
                setBgTile={ setBgTile }
            />

            <Map
                size={ mapSize }
                tileset={ tileset }
                tiles={ tiles }
                activeTile={ activeTile }
                setTiles={ setTiles }
                bgTile={ bgTile }
            />

            <Player skin='f1' />
            <Player skin='m2' />
            {/* <Player skin='m1' /> */ }
        </div>
    );
}


export default Game;