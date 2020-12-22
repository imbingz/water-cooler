import React from 'react';
import Sprite from '../Sprite';

//each aninmation has three steps, default at 0 which is the current step
function Actor({ sprite, data, step = 0, dir = 0, position = { x: 0, y: 0 } }) {
    const { h, w } = data;
    return (
        <div>
            <Sprite
                // image={ '/sprites/skins/m1.png' }
                // data={ {
                //     x: 0,
                //     y: 0,
                //     w: 32,
                //     h: 32
                // } }
                image={sprite}
                position={position}
                data={{
                    x: step * w, //each step is a 32px frame - 3 steps total
                    y: step * h, //help with direction the sprite facing - 4 steps total
                    w, 
                    h
                }}
            />
        </div>
    );
}

export default Actor; 