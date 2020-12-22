import React from 'react';


function Sprite({ image, data, position }) {
    //deconstructure the data passed
    const { y, x, h, w } = data;

    return (
        // set image position n size
        <div
            style={ {
                position: 'absolute',
                top: position.y,
                left: position.x,
                height: `${h}px`,
                width: `${w}px`,
                backgroundImage: `url(${image})`,
                backgroundPosition: ` -${x}px -${y}px`, // which part of the sprite going to be visible - facing which direction - every frame is 32px x 32px
                backgroundRepeat: 'no-repeat',
                zIndex: 10
            } }
        />
    );
}

export default Sprite;