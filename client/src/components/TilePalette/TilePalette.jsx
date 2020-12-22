import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

/*** Tile component is a coollection of sprits  ** */
function TilePalette({ position, tileset, setTileset, activeTile, setActiveTile, setBgTile }) {
    //import tileset data from json folder - which replaces the size
    const tilesetData = require('../../data/tilesets.json');

    //build a tileset options (keys of the json obj -  only one for now. will add extra) for the drop down
    // group the option by type, replace - with " " in names
    const tilesets = Object.keys(tilesetData).map(set => ({
        type: 'group',
        // name: set.split("-").join(" "),
        name: set.replace(/-/g, ' '),
        items: tilesetData[set].variants.map(variant => ({
            value: `${set}/${variant}`,
            label: variant
        }))
    }));

    /****************
     [
        { value: 'rpg-nature-tileset/spring', label: 'spring' },
        { value: 'rpg-nature-tileset/fall', label: 'fall' },
        { value: 'rpg-nature-tileset/winter', label: 'winter' }
    ]
    ****************/

    //split the actively selectetd tileset (img) into  variants and tileset using destructuring - rpg-nature-tileset/spring
    const [tilesetGroup, tilesetVariant] = tileset.split('/');

    //use tilesetGroup and tilesetData to get the size
    const { width, height } = tilesetData[tilesetGroup].size;

    // setup tiles and we need to build up tile matrix - 2D array
    const tiles = [];
    //each tile is represented by a unique id
    let id = 0;

    //use a set of nested for..loops to build matrix
    //first for..loop is based on the height of the tile - 32px x 32px
    for (let y = 0; y < height; y = y + 32) {
        // each y create a row
        const row = [];
        //for each row, fill out x with tile obj
        for (let x = 0; x < width; x = x + 32) {
            row.push({
                x,
                y,
                id: id++
            });
        }

        //push each row to tiles
        tiles.push(row);
    }
  
    // console.dir(tiles); //=====> 9 rows, 20 tiles each row with x, y, id keys

    return (
        <div
            id='palatte'
            style={ {
                position: 'absolute',
                border: '1px solid black',
                top: position.y,
                left: position.x,
                zIndex: 100,
                backgroundColor: 'white'
            } }>
            <div style={ { display: 'flex', margin: 4 } }>
                {/* draggablle tool-bar image  */ }
                <img id='handle' src='/img/drag-handle.png' alt='' />
                {/* display activeTile div */ }
                <div style={ { position: 'relative', width: 32, marginLeft: 8 } }>
                    <div
                        style={ {
                            background: `url(/sprites/${tileset}.png)
                            -${activeTile.x}px -${activeTile.y}px
                            no-repeat`,
                            width: 32,
                            height: 32
                        } }
                    />
                </div>
                {/* dropdown  */ }
                <div style={ { width: 200, marginLeft: 8 } }>
                    <Dropdown options={ tilesets } value={ tileset } onChange={ tileset => setTileset(tileset.value) } />
                </div>

                {/* Fill-BG Btn */ }
                <div style={ { width: 200, marginLeft: 8 } }>
                    <button
                        onClick={ () => setBgTile(activeTile) }
                        style={ {
                            padding: '6px 20px',
                            fontSize: 14
                        } }>
                        Fill BG
                    </button>
                </div>
            </div>

            {/* display tiles using map */ }
            {tiles.map((row, y) => (
                // each div is a row - inline style
                <div style={ { display: 'flex' } } key={ y }>
                    {row.map((tile, x) => (
                        <div
                            onClick={ () => setActiveTile({ x: x * 32, y: y * 32 }) }
                            key={ tile.id }
                            style={ {
                                borderTop: '1px solid grey',
                                borderRight: '1px solid grey',
                                background: `url(/sprites/${tileset}.png)
								-${x * 32}px -${y * 32}px
								no-repeat`,
                                width: 32,
                                height: 32
                            } }
                        />
                    )) }
                </div>
            )) }
        </div>
    );
}


export default TilePalette;